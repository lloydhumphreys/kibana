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

import { resolve } from 'path';
import { Legacy } from 'kibana';

import { LegacyPluginApi, LegacyPluginInitializer } from '../../../../src/legacy/types';
import { VisTypeTimeseriesSetup } from '../../../plugins/vis_type_timeseries/server';

const metricsPluginInitializer: LegacyPluginInitializer = ({ Plugin }: LegacyPluginApi) =>
  new Plugin({
    id: 'metrics',
    require: ['kibana', 'elasticsearch'],
    publicDir: resolve(__dirname, 'public'),
    uiExports: {
      styleSheetPaths: resolve(__dirname, 'public/index.scss'),
      hacks: [resolve(__dirname, 'public/legacy')],
      injectDefaultVars: server => ({}),
      mappings: {
        'tsvb-validation-telemetry': {
          properties: {
            failedRequests: {
              type: 'long',
            },
          },
        },
      },
      savedObjectSchemas: {
        'tsvb-validation-telemetry': {
          isNamespaceAgnostic: true,
        },
      },
    },
    init: (server: Legacy.Server) => {
      const visTypeTimeSeriesPlugin = server.newPlatform.setup.plugins
        .metrics as VisTypeTimeseriesSetup;
      visTypeTimeSeriesPlugin.__legacy.registerLegacyAPI({ server });
    },
    config(Joi: any) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        chartResolution: Joi.number().default(150),
        minimumBucketSize: Joi.number().default(10),
      }).default();
    },
  } as Legacy.PluginSpecOptions);

// eslint-disable-next-line import/no-default-export
export default metricsPluginInitializer;
