/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Configuration } from "@atomist/automation-client";
import { configureDashboardNotifications } from "@atomist/automation-client-ext-dashboard";
import { SoftwareDeliveryMachine } from "@atomist/sdm";
import { SoftwareDeliveryMachineConfiguration } from "@atomist/sdm/api/machine/SoftwareDeliveryMachineOptions";
import {
    ConfigureOptions,
    configureSdm,
} from "@atomist/sdm/internal/machine/configureSdm";
import { springGeneratorMachine } from "./machine/springGeneratorMachine";
import { configureLogzio } from "./util/logzio";

function createMachine(
    config: SoftwareDeliveryMachineConfiguration): SoftwareDeliveryMachine {
    return springGeneratorMachine(config);
}

const Options: ConfigureOptions = {
    requiredConfigurationValues: [],
};

export const configuration: Configuration = {
    http: {
        auth: {
            basic: {
                enabled: true,
                username: "admin",
                password: process.env.LOCAL_ATOMIST_ADMIN_PASSWORD,
            },
        },
    },
    cluster: {
        workers: 1,
    },
    logging: {
        level: "info",
    },
    postProcessors: [
        configureLogzio,
        configureDashboardNotifications,
        configureSdm(createMachine, Options),
    ],
};
