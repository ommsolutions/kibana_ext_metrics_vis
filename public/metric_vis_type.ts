/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { i18n } from '@kbn/i18n';

// @ts-ignore
import { Schemas } from '../../../src/legacy/ui/public/vis/editors/default/schemas';
import { vislibColorMaps } from '../../../src/legacy/ui/public/vislib/components/color/colormaps';
// @ts-ignore
import { ExtendedMetricVisComponent } from './components/extended_metric_vis_controller';

import { visFactory } from 'plugins/visualizations';

export const createMetricVisTypeDefinition = () => {
  return visFactory.createReactVisualization({
    name: 'extended_metric',
    title: i18n.translate('visTypeMetric.metricTitle', { defaultMessage: 'Extended Metric' }),
    icon: 'visMetric',
    description: i18n.translate('visTypeMetric.metricDescription', {
      defaultMessage: 'Based on the core Metric-Plugin but gives you the ability' +
        'to output custom aggregates on metric-results.',
    }),
    visConfig: {
      component: ExtendedMetricVisComponent,
      defaults: {
        addTooltip: true,
        addLegend: false,
        type: 'metric',
        metric: {
          percentageMode: false,
          useRanges: false,
          colorSchema: 'Green to Red',
          metricColorMode: 'None',
          colorsRange: [{ from: 0, to: 10000 }],
          labels: {
            show: true,
          },
          invertColors: false,
          style: {
            bgFill: '#000',
            bgColor: false,
            labelColor: false,
            subText: '',
            fontSize: 60,
          },
        },
      },
    },
    editorConfig: {
      collections: {
        metricColorMode: [
          {
            id: 'None',
            label: i18n.translate('visTypeMetric.colorModes.noneOptionLabel', {
              defaultMessage: 'None',
            }),
          },
          {
            id: 'Labels',
            label: i18n.translate('visTypeMetric.colorModes.labelsOptionLabel', {
              defaultMessage: 'Labels',
            }),
          },
          {
            id: 'Background',
            label: i18n.translate('visTypeMetric.colorModes.backgroundOptionLabel', {
              defaultMessage: 'Background',
            }),
          },
        ],
        colorSchemas: Object.values(vislibColorMaps).map((value: any) => ({
          id: value.id,
          label: value.label,
        })),
      },
      optionsTemplate: '<extended-metric-vis-params></extended-metric-vis-params>',
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: i18n.translate('visTypeMetric.schemas.metricTitle', { defaultMessage: 'Metric' }),
          min: 1,
          aggFilter: [
            '!std_dev',
            '!geo_centroid',
            '!derivative',
            '!serial_diff',
            '!moving_avg',
            '!cumulative_sum',
            '!geo_bounds',
          ],
          aggSettings: {
            top_hits: {
              allowStrings: true,
            },
          },
          defaults: [
            {
              type: 'count',
              schema: 'metric',
            },
          ],
        },
        {
          group: 'buckets',
          name: 'group',
          title: i18n.translate('visTypeMetric.schemas.splitGroupTitle', {
            defaultMessage: 'Split group',
          }),
          min: 0,
          max: 1,
          aggFilter: ['!geohash_grid', '!geotile_grid', '!filter'],
        },
      ]),
    },
  });
};
