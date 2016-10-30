import _ from 'lodash';
import AggResponseTabifyTabifyProvider from 'ui/agg_response/tabify/tabify';
import uiModules from 'ui/modules';
const module = uiModules.get('kibana/extended_metric_vis', ['kibana']);

module.controller('KbnExtendedMetricVisController', function ($scope, Private) {
  const tabifyAggResponse = Private(AggResponseTabifyTabifyProvider);
  const metrics = $scope.metrics = [];
  const calcOutputs = $scope.calcOutputs = [];

  function isInvalid(val) {
    return _.isUndefined(val) || _.isNull(val) || _.isNaN(val);
  }

  function updateOutputs() {
    $scope.vis.params.outputs.forEach(function (output) {
      try {
        const func = Function("metrics", "return " + output.formula);
        output.value = func(metrics) || "?";
      } catch (e) {
        output.value = '?';
      }
    });
  }

  $scope.processTableGroups = function (tableGroups) {
    tableGroups.tables.forEach(function (table) {
      table.columns.forEach(function (column, i) {
        const fieldFormatter = table.aggConfig(column).fieldFormatter();
        let value = table.rows[0][i];
        let formattedValue = isInvalid(value) ? '?' : fieldFormatter(value);

        const metric = {
          label: column.title,
          value: value,
          formattedValue: formattedValue
        };
        metrics.push(metric);
        metrics[column.title] = metric;
      });
    });

    updateOutputs();
  };

  // watches
  $scope.$watch('esResponse', function (resp) {
    if (resp) {
      calcOutputs.length = 0;
      metrics.length = 0;
      for (let key in metrics) {
        if (metrics.hasOwnProperty(key)) {
          delete metrics[key];
        }
      }
      $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
    }
  });

  $scope.$watchCollection('vis.params.outputs', updateOutputs);
});

module.controller('ExtendedMetricEditorController', function ($scope) {
  // Output Related Methods:
  $scope.addOutput = function (outputs) {
    outputs.push({
      formula: 'metrics[0].value * metrics[0].value',
      label: 'Count squared',
      enabled: true
    });
  };

  $scope.removeOuput = function (output, outputs) {
    if (outputs.length === 1) {
      return;
    }
    const index = outputs.indexOf(output);
    if (index >= 0) {
      outputs.splice(index, 1);
    }

    if (outputs.length === 1) {
      outputs[0].enabled = true;
    }
  };
});
