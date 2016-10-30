import 'plugins/extended_metric_vis/extended_metric_vis.less';
import 'plugins/extended_metric_vis/extended_metric_vis_controller';
import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';
import extendedMetricVisTemplate from 'plugins/extended_metric_vis/extended_metric_vis.html';
import metricVisParamsTemplate from 'plugins/extended_metric_vis/extended_metric_vis_params.html';
// we need to load the css ourselves

// we also need to load the controller and used by the template

// register the provider with the visTypes registry
require('ui/registry/vis_types').register(ExtendedMetricVisProvider);

function ExtendedMetricVisProvider(Private) {
  const TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  return new TemplateVisType({
    name: 'extended_metric',
    title: 'Extended Metric',
    description: 'Based on the core Metric-Plugin but gives you the ability' +
      'to output custom aggregates on metric-results.',
    icon: 'fa-calculator',
    template: extendedMetricVisTemplate,
    params: {
      defaults: {
        handleNoResults: true,
        fontSize: 60,
        outputs: [
          {
            formula: 'metrics[0].value * metrics[0].value',
            label: 'Count squared',
            enabled: true
          }
        ]
      },
      editor: metricVisParamsTemplate
    },
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Metric',
        min: 1,
        defaults: [
          { type: 'count', schema: 'metric' }
        ]
      }
    ])
  });
}

// export the provider so that the visType can be required with Private()
export default ExtendedMetricVisProvider;
