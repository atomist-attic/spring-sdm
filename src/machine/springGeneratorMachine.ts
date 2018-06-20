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

import { GitHubRepoRef } from "@atomist/automation-client/operations/common/GitHubRepoRef";
import { SoftwareDeliveryMachine } from "@atomist/sdm";
import {
    CommonJavaGeneratorConfig,
    springBootGenerator,
} from "@atomist/sdm-pack-spring";
import { SoftwareDeliveryMachineConfiguration } from "@atomist/sdm/api/machine/SoftwareDeliveryMachineOptions";
import { createSoftwareDeliveryMachine } from "@atomist/sdm/machine/machineFactory";

export function springGeneratorMachine(configuration: SoftwareDeliveryMachineConfiguration): SoftwareDeliveryMachine {
    const sdm: SoftwareDeliveryMachine = createSoftwareDeliveryMachine(
        {
            name: "Spring software delivery machine",
            configuration,
        });

    sdm.addGenerators(springBootGenerator({
            ...CommonJavaGeneratorConfig,
            seed: () => new GitHubRepoRef("spring-team", "spring-rest-seed"),
        }, {
            intent: "generate spring",
        }), springBootGenerator({
            ...CommonJavaGeneratorConfig,
            seed: () => new GitHubRepoRef("johnsonr", "flux-flix-service"),
        }, {
            intent: "generate spring kotlin",
        }));

    return sdm;
}