/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/material/schematics/ng-add/theming/theming", ["require", "exports", "@angular-devkit/core", "@angular-devkit/schematics", "@angular/cdk/schematics", "@schematics/angular/utility/change", "@schematics/angular/utility/config", "path", "@angular/material/schematics/ng-add/theming/create-custom-theme"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const core_1 = require("@angular-devkit/core");
    const schematics_1 = require("@angular-devkit/schematics");
    const schematics_2 = require("@angular/cdk/schematics");
    const change_1 = require("@schematics/angular/utility/change");
    const config_1 = require("@schematics/angular/utility/config");
    const path_1 = require("path");
    const create_custom_theme_1 = require("@angular/material/schematics/ng-add/theming/create-custom-theme");
    /** Path segment that can be found in paths that refer to a prebuilt theme. */
    const prebuiltThemePathSegment = '@angular/material/prebuilt-themes';
    /** Default file name of the custom theme that can be generated. */
    const defaultCustomThemeFilename = 'custom-theme.scss';
    /** Add pre-built styles to the main project style file. */
    function addThemeToAppStyles(options) {
        return function (host, context) {
            const workspace = config_1.getWorkspace(host);
            const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
            const themeName = options.theme || 'indigo-pink';
            if (themeName === 'custom') {
                insertCustomTheme(project, options.project, host, workspace, context.logger);
            }
            else {
                insertPrebuiltTheme(project, host, themeName, workspace, context.logger);
            }
            return host;
        };
    }
    exports.addThemeToAppStyles = addThemeToAppStyles;
    /** Adds the global typography class to the body element. */
    function addTypographyClass(options) {
        return function (host) {
            const workspace = config_1.getWorkspace(host);
            const project = schematics_2.getProjectFromWorkspace(workspace, options.project);
            const projectIndexFiles = schematics_2.getProjectIndexFiles(project);
            if (!projectIndexFiles.length) {
                throw new schematics_1.SchematicsException('No project index HTML file could be found.');
            }
            projectIndexFiles.forEach(indexFilePath => schematics_2.addBodyClass(host, indexFilePath, 'mat-typography'));
            return host;
        };
    }
    exports.addTypographyClass = addTypographyClass;
    /**
     * Insert a custom theme to project style file. If no valid style file could be found, a new
     * Scss file for the custom theme will be created.
     */
    function insertCustomTheme(project, projectName, host, workspace, logger) {
        const stylesPath = schematics_2.getProjectStyleFile(project, 'scss');
        const themeContent = create_custom_theme_1.createCustomTheme(projectName);
        if (!stylesPath) {
            if (!project.sourceRoot) {
                throw new schematics_1.SchematicsException(`Could not find source root for project: "${projectName}". ` +
                    `Please make sure that the "sourceRoot" property is set in the workspace config.`);
            }
            // Normalize the path through the devkit utilities because we want to avoid having
            // unnecessary path segments and windows backslash delimiters.
            const customThemePath = core_1.normalize(path_1.join(project.sourceRoot, defaultCustomThemeFilename));
            if (host.exists(customThemePath)) {
                logger.warn(`Cannot create a custom Angular Material theme because
          ${customThemePath} already exists. Skipping custom theme generation.`);
                return;
            }
            host.create(customThemePath, themeContent);
            addThemeStyleToTarget(project, 'build', host, customThemePath, workspace, logger);
            return;
        }
        const insertion = new change_1.InsertChange(stylesPath, 0, themeContent);
        const recorder = host.beginUpdate(stylesPath);
        recorder.insertLeft(insertion.pos, insertion.toAdd);
        host.commitUpdate(recorder);
    }
    /** Insert a pre-built theme into the angular.json file. */
    function insertPrebuiltTheme(project, host, theme, workspace, logger) {
        // Path needs to be always relative to the `package.json` or workspace root.
        const themePath = `./node_modules/@angular/material/prebuilt-themes/${theme}.css`;
        addThemeStyleToTarget(project, 'build', host, themePath, workspace, logger);
        addThemeStyleToTarget(project, 'test', host, themePath, workspace, logger);
    }
    /** Adds a theming style entry to the given project target options. */
    function addThemeStyleToTarget(project, targetName, host, assetPath, workspace, logger) {
        // Do not update the builder options in case the target does not use the default CLI builder.
        if (!validateDefaultTargetBuilder(project, targetName, logger)) {
            return;
        }
        const targetOptions = schematics_2.getProjectTargetOptions(project, targetName);
        if (!targetOptions.styles) {
            targetOptions.styles = [assetPath];
        }
        else {
            const existingStyles = targetOptions.styles.map(s => typeof s === 'string' ? s : s.input);
            for (let [index, stylePath] of existingStyles.entries()) {
                // If the given asset is already specified in the styles, we don't need to do anything.
                if (stylePath === assetPath) {
                    return;
                }
                // In case a prebuilt theme is already set up, we can safely replace the theme with the new
                // theme file. If a custom theme is set up, we are not able to safely replace the custom
                // theme because these files can contain custom styles, while prebuilt themes are
                // always packaged and considered replaceable.
                if (stylePath.includes(defaultCustomThemeFilename)) {
                    logger.error(`Could not add the selected theme to the CLI project ` +
                        `configuration because there is already a custom theme file referenced.`);
                    logger.info(`Please manually add the following style file to your configuration:`);
                    logger.info(`    ${assetPath}`);
                    return;
                }
                else if (stylePath.includes(prebuiltThemePathSegment)) {
                    targetOptions.styles.splice(index, 1);
                }
            }
            targetOptions.styles.unshift(assetPath);
        }
        host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
    }
    /**
     * Validates that the specified project target is configured with the default builders which are
     * provided by the Angular CLI. If the configured builder does not match the default builder,
     * this function can either throw or just show a warning.
     */
    function validateDefaultTargetBuilder(project, targetName, logger) {
        const defaultBuilder = schematics_2.defaultTargetBuilders[targetName];
        const targetConfig = project.architect && project.architect[targetName] ||
            project.targets && project.targets[targetName];
        const isDefaultBuilder = targetConfig && targetConfig['builder'] === defaultBuilder;
        // Because the build setup for the Angular CLI can be customized by developers, we can't know
        // where to put the theme file in the workspace configuration if custom builders are being
        // used. In case the builder has been changed for the "build" target, we throw an error and
        // exit because setting up a theme is a primary goal of `ng-add`. Otherwise if just the "test"
        // builder has been changed, we warn because a theme is not mandatory for running tests
        // with Material. See: https://github.com/angular/components/issues/14176
        if (!isDefaultBuilder && targetName === 'build') {
            throw new schematics_1.SchematicsException(`Your project is not using the default builders for ` +
                `"${targetName}". The Angular Material schematics cannot add a theme to the workspace ` +
                `configuration if the builder has been changed.`);
        }
        else if (!isDefaultBuilder) {
            // for non-build targets we gracefully report the error without actually aborting the
            // setup schematic. This is because a theme is not mandatory for running tests.
            logger.warn(`Your project is not using the default builders for "${targetName}". This ` +
                `means that we cannot add the configured theme to the "${targetName}" target.`);
        }
        return isDefaultBuilder;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zY2hlbWF0aWNzL25nLWFkZC90aGVtaW5nL3RoZW1pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCwrQ0FBd0Q7SUFFeEQsMkRBQTZGO0lBQzdGLHdEQU9pQztJQUNqQywrREFBZ0U7SUFDaEUsK0RBQWdFO0lBQ2hFLCtCQUEwQjtJQUUxQix5R0FBd0Q7SUFFeEQsOEVBQThFO0lBQzlFLE1BQU0sd0JBQXdCLEdBQUcsbUNBQW1DLENBQUM7SUFFckUsbUVBQW1FO0lBQ25FLE1BQU0sMEJBQTBCLEdBQUcsbUJBQW1CLENBQUM7SUFFdkQsMkRBQTJEO0lBQzNELFNBQWdCLG1CQUFtQixDQUFDLE9BQWU7UUFDakQsT0FBTyxVQUFTLElBQVUsRUFBRSxPQUF5QjtZQUNuRCxNQUFNLFNBQVMsR0FBRyxxQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sT0FBTyxHQUFHLG9DQUF1QixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEUsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxhQUFhLENBQUM7WUFFakQsSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFO2dCQUMxQixpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM5RTtpQkFBTTtnQkFDTCxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFFO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0lBZEQsa0RBY0M7SUFFRCw0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LENBQUM7SUFDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge25vcm1hbGl6ZSwgbG9nZ2luZ30gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHtXb3Jrc3BhY2VQcm9qZWN0LCBXb3Jrc3BhY2VTY2hlbWF9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlL3NyYy9leHBlcmltZW50YWwvd29ya3NwYWNlJztcbmltcG9ydCB7UnVsZSwgU2NoZW1hdGljQ29udGV4dCwgU2NoZW1hdGljc0V4Y2VwdGlvbiwgVHJlZX0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtcbiAgYWRkQm9keUNsYXNzLFxuICBkZWZhdWx0VGFyZ2V0QnVpbGRlcnMsXG4gIGdldFByb2plY3RGcm9tV29ya3NwYWNlLFxuICBnZXRQcm9qZWN0U3R5bGVGaWxlLFxuICBnZXRQcm9qZWN0VGFyZ2V0T3B0aW9ucyxcbiAgZ2V0UHJvamVjdEluZGV4RmlsZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY2hlbWF0aWNzJztcbmltcG9ydCB7SW5zZXJ0Q2hhbmdlfSBmcm9tICdAc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvY2hhbmdlJztcbmltcG9ydCB7Z2V0V29ya3NwYWNlfSBmcm9tICdAc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvY29uZmlnJztcbmltcG9ydCB7am9pbn0gZnJvbSAncGF0aCc7XG5pbXBvcnQge1NjaGVtYX0gZnJvbSAnLi4vc2NoZW1hJztcbmltcG9ydCB7Y3JlYXRlQ3VzdG9tVGhlbWV9IGZyb20gJy4vY3JlYXRlLWN1c3RvbS10aGVtZSc7XG5cbi8qKiBQYXRoIHNlZ21lbnQgdGhhdCBjYW4gYmUgZm91bmQgaW4gcGF0aHMgdGhhdCByZWZlciB0byBhIHByZWJ1aWx0IHRoZW1lLiAqL1xuY29uc3QgcHJlYnVpbHRUaGVtZVBhdGhTZWdtZW50ID0gJ0Bhbmd1bGFyL21hdGVyaWFsL3ByZWJ1aWx0LXRoZW1lcyc7XG5cbi8qKiBEZWZhdWx0IGZpbGUgbmFtZSBvZiB0aGUgY3VzdG9tIHRoZW1lIHRoYXQgY2FuIGJlIGdlbmVyYXRlZC4gKi9cbmNvbnN0IGRlZmF1bHRDdXN0b21UaGVtZUZpbGVuYW1lID0gJ2N1c3RvbS10aGVtZS5zY3NzJztcblxuLyoqIEFkZCBwcmUtYnVpbHQgc3R5bGVzIHRvIHRoZSBtYWluIHByb2plY3Qgc3R5bGUgZmlsZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRUaGVtZVRvQXBwU3R5bGVzKG9wdGlvbnM6IFNjaGVtYSk6IFJ1bGUge1xuICByZXR1cm4gZnVuY3Rpb24oaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCk6IFRyZWUge1xuICAgIGNvbnN0IHdvcmtzcGFjZSA9IGdldFdvcmtzcGFjZShob3N0KTtcbiAgICBjb25zdCBwcm9qZWN0ID0gZ2V0UHJvamVjdEZyb21Xb3Jrc3BhY2Uod29ya3NwYWNlLCBvcHRpb25zLnByb2plY3QpO1xuICAgIGNvbnN0IHRoZW1lTmFtZSA9IG9wdGlvbnMudGhlbWUgfHwgJ2luZGlnby1waW5rJztcblxuICAgIGlmICh0aGVtZU5hbWUgPT09ICdjdXN0b20nKSB7XG4gICAgICBpbnNlcnRDdXN0b21UaGVtZShwcm9qZWN0LCBvcHRpb25zLnByb2plY3QsIGhvc3QsIHdvcmtzcGFjZSwgY29udGV4dC5sb2dnZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnNlcnRQcmVidWlsdFRoZW1lKHByb2plY3QsIGhvc3QsIHRoZW1lTmFtZSwgd29ya3NwYWNlLCBjb250ZXh0LmxvZ2dlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhvc3Q7XG4gIH07XG59XG5cbi8qKiBBZGRzIHRoZSBnbG9iYWwgdHlwb2dyYXBoeSBjbGFzcyB0byB0aGUgYm9keSBlbGVtZW50LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFR5cG9ncmFwaHlDbGFzcyhvcHRpb25zOiBTY2hlbWEpOiAoaG9zdDogVHJlZSkgPT4gVHJlZSB7XG4gIHJldHVybiBmdW5jdGlvbihob3N0OiBUcmVlKTogVHJlZSB7XG4gICAgY29uc3Qgd29ya3NwYWNlID0gZ2V0V29ya3NwYWNlKGhvc3QpO1xuICAgIGNvbnN0IHByb2plY3QgPSBnZXRQcm9qZWN0RnJvbVdvcmtzcGFjZSh3b3Jrc3BhY2UsIG9wdGlvbnMucHJvamVjdCk7XG4gICAgY29uc3QgcHJvamVjdEluZGV4RmlsZXMgPSBnZXRQcm9qZWN0SW5kZXhGaWxlcyhwcm9qZWN0KTtcblxuICAgIGlmICghcHJvamVjdEluZGV4RmlsZXMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbignTm8gcHJvamVjdCBpbmRleCBIVE1MIGZpbGUgY291bGQgYmUgZm91bmQuJyk7XG4gICAgfVxuXG4gICAgcHJvamVjdEluZGV4RmlsZXMuZm9yRWFjaChpbmRleEZpbGVQYXRoID0+IGFkZEJvZHlDbGFzcyhob3N0LCBpbmRleEZpbGVQYXRoLCAnbWF0LXR5cG9ncmFwaHknKSk7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBJbnNlcnQgYSBjdXN0b20gdGhlbWUgdG8gcHJvamVjdCBzdHlsZSBmaWxlLiBJZiBubyB2YWxpZCBzdHlsZSBmaWxlIGNvdWxkIGJlIGZvdW5kLCBhIG5ld1xuICogU2NzcyBmaWxlIGZvciB0aGUgY3VzdG9tIHRoZW1lIHdpbGwgYmUgY3JlYXRlZC5cbiAqL1xuZnVuY3Rpb24gaW5zZXJ0Q3VzdG9tVGhlbWUocHJvamVjdDogV29ya3NwYWNlUHJvamVjdCwgcHJvamVjdE5hbWU6IHN0cmluZywgaG9zdDogVHJlZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtzcGFjZTogV29ya3NwYWNlU2NoZW1hLCBsb2dnZXI6IGxvZ2dpbmcuTG9nZ2VyQXBpKSB7XG5cbiAgY29uc3Qgc3R5bGVzUGF0aCA9IGdldFByb2plY3RTdHlsZUZpbGUocHJvamVjdCwgJ3Njc3MnKTtcbiAgY29uc3QgdGhlbWVDb250ZW50ID0gY3JlYXRlQ3VzdG9tVGhlbWUocHJvamVjdE5hbWUpO1xuXG4gIGlmICghc3R5bGVzUGF0aCkge1xuICAgIGlmICghcHJvamVjdC5zb3VyY2VSb290KSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgQ291bGQgbm90IGZpbmQgc291cmNlIHJvb3QgZm9yIHByb2plY3Q6IFwiJHtwcm9qZWN0TmFtZX1cIi4gYCArXG4gICAgICAgIGBQbGVhc2UgbWFrZSBzdXJlIHRoYXQgdGhlIFwic291cmNlUm9vdFwiIHByb3BlcnR5IGlzIHNldCBpbiB0aGUgd29ya3NwYWNlIGNvbmZpZy5gKTtcbiAgICB9XG5cbiAgICAvLyBOb3JtYWxpemUgdGhlIHBhdGggdGhyb3VnaCB0aGUgZGV2a2l0IHV0aWxpdGllcyBiZWNhdXNlIHdlIHdhbnQgdG8gYXZvaWQgaGF2aW5nXG4gICAgLy8gdW5uZWNlc3NhcnkgcGF0aCBzZWdtZW50cyBhbmQgd2luZG93cyBiYWNrc2xhc2ggZGVsaW1pdGVycy5cbiAgICBjb25zdCBjdXN0b21UaGVtZVBhdGggPSBub3JtYWxpemUoam9pbihwcm9qZWN0LnNvdXJjZVJvb3QsIGRlZmF1bHRDdXN0b21UaGVtZUZpbGVuYW1lKSk7XG5cbiAgICBpZiAoaG9zdC5leGlzdHMoY3VzdG9tVGhlbWVQYXRoKSkge1xuICAgICAgbG9nZ2VyLndhcm4oYENhbm5vdCBjcmVhdGUgYSBjdXN0b20gQW5ndWxhciBNYXRlcmlhbCB0aGVtZSBiZWNhdXNlXG4gICAgICAgICAgJHtjdXN0b21UaGVtZVBhdGh9IGFscmVhZHkgZXhpc3RzLiBTa2lwcGluZyBjdXN0b20gdGhlbWUgZ2VuZXJhdGlvbi5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBob3N0LmNyZWF0ZShjdXN0b21UaGVtZVBhdGgsIHRoZW1lQ29udGVudCk7XG4gICAgYWRkVGhlbWVTdHlsZVRvVGFyZ2V0KHByb2plY3QsICdidWlsZCcsIGhvc3QsIGN1c3RvbVRoZW1lUGF0aCwgd29ya3NwYWNlLCBsb2dnZXIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGluc2VydGlvbiA9IG5ldyBJbnNlcnRDaGFuZ2Uoc3R5bGVzUGF0aCwgMCwgdGhlbWVDb250ZW50KTtcbiAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKHN0eWxlc1BhdGgpO1xuXG4gIHJlY29yZGVyLmluc2VydExlZnQoaW5zZXJ0aW9uLnBvcywgaW5zZXJ0aW9uLnRvQWRkKTtcbiAgaG9zdC5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xufVxuXG4vKiogSW5zZXJ0IGEgcHJlLWJ1aWx0IHRoZW1lIGludG8gdGhlIGFuZ3VsYXIuanNvbiBmaWxlLiAqL1xuZnVuY3Rpb24gaW5zZXJ0UHJlYnVpbHRUaGVtZShwcm9qZWN0OiBXb3Jrc3BhY2VQcm9qZWN0LCBob3N0OiBUcmVlLCB0aGVtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3Jrc3BhY2U6IFdvcmtzcGFjZVNjaGVtYSwgbG9nZ2VyOiBsb2dnaW5nLkxvZ2dlckFwaSkge1xuXG4gIC8vIFBhdGggbmVlZHMgdG8gYmUgYWx3YXlzIHJlbGF0aXZlIHRvIHRoZSBgcGFja2FnZS5qc29uYCBvciB3b3Jrc3BhY2Ugcm9vdC5cbiAgY29uc3QgdGhlbWVQYXRoID0gIGAuL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9wcmVidWlsdC10aGVtZXMvJHt0aGVtZX0uY3NzYDtcblxuICBhZGRUaGVtZVN0eWxlVG9UYXJnZXQocHJvamVjdCwgJ2J1aWxkJywgaG9zdCwgdGhlbWVQYXRoLCB3b3Jrc3BhY2UsIGxvZ2dlcik7XG4gIGFkZFRoZW1lU3R5bGVUb1RhcmdldChwcm9qZWN0LCAndGVzdCcsIGhvc3QsIHRoZW1lUGF0aCwgd29ya3NwYWNlLCBsb2dnZXIpO1xufVxuXG4vKiogQWRkcyBhIHRoZW1pbmcgc3R5bGUgZW50cnkgdG8gdGhlIGdpdmVuIHByb2plY3QgdGFyZ2V0IG9wdGlvbnMuICovXG5mdW5jdGlvbiBhZGRUaGVtZVN0eWxlVG9UYXJnZXQocHJvamVjdDogV29ya3NwYWNlUHJvamVjdCwgdGFyZ2V0TmFtZTogJ3Rlc3QnIHwgJ2J1aWxkJywgaG9zdDogVHJlZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldFBhdGg6IHN0cmluZywgd29ya3NwYWNlOiBXb3Jrc3BhY2VTY2hlbWEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyOiBsb2dnaW5nLkxvZ2dlckFwaSkge1xuICAvLyBEbyBub3QgdXBkYXRlIHRoZSBidWlsZGVyIG9wdGlvbnMgaW4gY2FzZSB0aGUgdGFyZ2V0IGRvZXMgbm90IHVzZSB0aGUgZGVmYXVsdCBDTEkgYnVpbGRlci5cbiAgaWYgKCF2YWxpZGF0ZURlZmF1bHRUYXJnZXRCdWlsZGVyKHByb2plY3QsIHRhcmdldE5hbWUsIGxvZ2dlcikpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB0YXJnZXRPcHRpb25zID0gZ2V0UHJvamVjdFRhcmdldE9wdGlvbnMocHJvamVjdCwgdGFyZ2V0TmFtZSk7XG5cbiAgaWYgKCF0YXJnZXRPcHRpb25zLnN0eWxlcykge1xuICAgIHRhcmdldE9wdGlvbnMuc3R5bGVzID0gW2Fzc2V0UGF0aF07XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZXhpc3RpbmdTdHlsZXMgPSB0YXJnZXRPcHRpb25zLnN0eWxlcy5tYXAocyA9PiB0eXBlb2YgcyA9PT0gJ3N0cmluZycgPyBzIDogcy5pbnB1dCk7XG5cbiAgICBmb3IgKGxldCBbaW5kZXgsIHN0eWxlUGF0aF0gb2YgZXhpc3RpbmdTdHlsZXMuZW50cmllcygpKSB7XG4gICAgICAvLyBJZiB0aGUgZ2l2ZW4gYXNzZXQgaXMgYWxyZWFkeSBzcGVjaWZpZWQgaW4gdGhlIHN0eWxlcywgd2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZy5cbiAgICAgIGlmIChzdHlsZVBhdGggPT09IGFzc2V0UGF0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEluIGNhc2UgYSBwcmVidWlsdCB0aGVtZSBpcyBhbHJlYWR5IHNldCB1cCwgd2UgY2FuIHNhZmVseSByZXBsYWNlIHRoZSB0aGVtZSB3aXRoIHRoZSBuZXdcbiAgICAgIC8vIHRoZW1lIGZpbGUuIElmIGEgY3VzdG9tIHRoZW1lIGlzIHNldCB1cCwgd2UgYXJlIG5vdCBhYmxlIHRvIHNhZmVseSByZXBsYWNlIHRoZSBjdXN0b21cbiAgICAgIC8vIHRoZW1lIGJlY2F1c2UgdGhlc2UgZmlsZXMgY2FuIGNvbnRhaW4gY3VzdG9tIHN0eWxlcywgd2hpbGUgcHJlYnVpbHQgdGhlbWVzIGFyZVxuICAgICAgLy8gYWx3YXlzIHBhY2thZ2VkIGFuZCBjb25zaWRlcmVkIHJlcGxhY2VhYmxlLlxuICAgICAgaWYgKHN0eWxlUGF0aC5pbmNsdWRlcyhkZWZhdWx0Q3VzdG9tVGhlbWVGaWxlbmFtZSkpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBDb3VsZCBub3QgYWRkIHRoZSBzZWxlY3RlZCB0aGVtZSB0byB0aGUgQ0xJIHByb2plY3QgYCArXG4gICAgICAgICAgICBgY29uZmlndXJhdGlvbiBiZWNhdXNlIHRoZXJlIGlzIGFscmVhZHkgYSBjdXN0b20gdGhlbWUgZmlsZSByZWZlcmVuY2VkLmApO1xuICAgICAgICBsb2dnZXIuaW5mbyhgUGxlYXNlIG1hbnVhbGx5IGFkZCB0aGUgZm9sbG93aW5nIHN0eWxlIGZpbGUgdG8geW91ciBjb25maWd1cmF0aW9uOmApO1xuICAgICAgICBsb2dnZXIuaW5mbyhgICAgICR7YXNzZXRQYXRofWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHN0eWxlUGF0aC5pbmNsdWRlcyhwcmVidWlsdFRoZW1lUGF0aFNlZ21lbnQpKSB7XG4gICAgICAgIHRhcmdldE9wdGlvbnMuc3R5bGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGFyZ2V0T3B0aW9ucy5zdHlsZXMudW5zaGlmdChhc3NldFBhdGgpO1xuICB9XG5cbiAgaG9zdC5vdmVyd3JpdGUoJ2FuZ3VsYXIuanNvbicsIEpTT04uc3RyaW5naWZ5KHdvcmtzcGFjZSwgbnVsbCwgMikpO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGF0IHRoZSBzcGVjaWZpZWQgcHJvamVjdCB0YXJnZXQgaXMgY29uZmlndXJlZCB3aXRoIHRoZSBkZWZhdWx0IGJ1aWxkZXJzIHdoaWNoIGFyZVxuICogcHJvdmlkZWQgYnkgdGhlIEFuZ3VsYXIgQ0xJLiBJZiB0aGUgY29uZmlndXJlZCBidWlsZGVyIGRvZXMgbm90IG1hdGNoIHRoZSBkZWZhdWx0IGJ1aWxkZXIsXG4gKiB0aGlzIGZ1bmN0aW9uIGNhbiBlaXRoZXIgdGhyb3cgb3IganVzdCBzaG93IGEgd2FybmluZy5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVEZWZhdWx0VGFyZ2V0QnVpbGRlcihwcm9qZWN0OiBXb3Jrc3BhY2VQcm9qZWN0LCB0YXJnZXROYW1lOiAnYnVpbGQnIHwgJ3Rlc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dnZXI6IGxvZ2dpbmcuTG9nZ2VyQXBpKSB7XG4gIGNvbnN0IGRlZmF1bHRCdWlsZGVyID0gZGVmYXVsdFRhcmdldEJ1aWxkZXJzW3RhcmdldE5hbWVdO1xuICBjb25zdCB0YXJnZXRDb25maWcgPSBwcm9qZWN0LmFyY2hpdGVjdCAmJiBwcm9qZWN0LmFyY2hpdGVjdFt0YXJnZXROYW1lXSB8fFxuICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LnRhcmdldHMgJiYgcHJvamVjdC50YXJnZXRzW3RhcmdldE5hbWVdO1xuICBjb25zdCBpc0RlZmF1bHRCdWlsZGVyID0gdGFyZ2V0Q29uZmlnICYmIHRhcmdldENvbmZpZ1snYnVpbGRlciddID09PSBkZWZhdWx0QnVpbGRlcjtcblxuICAvLyBCZWNhdXNlIHRoZSBidWlsZCBzZXR1cCBmb3IgdGhlIEFuZ3VsYXIgQ0xJIGNhbiBiZSBjdXN0b21pemVkIGJ5IGRldmVsb3BlcnMsIHdlIGNhbid0IGtub3dcbiAgLy8gd2hlcmUgdG8gcHV0IHRoZSB0aGVtZSBmaWxlIGluIHRoZSB3b3Jrc3BhY2UgY29uZmlndXJhdGlvbiBpZiBjdXN0b20gYnVpbGRlcnMgYXJlIGJlaW5nXG4gIC8vIHVzZWQuIEluIGNhc2UgdGhlIGJ1aWxkZXIgaGFzIGJlZW4gY2hhbmdlZCBmb3IgdGhlIFwiYnVpbGRcIiB0YXJnZXQsIHdlIHRocm93IGFuIGVycm9yIGFuZFxuICAvLyBleGl0IGJlY2F1c2Ugc2V0dGluZyB1cCBhIHRoZW1lIGlzIGEgcHJpbWFyeSBnb2FsIG9mIGBuZy1hZGRgLiBPdGhlcndpc2UgaWYganVzdCB0aGUgXCJ0ZXN0XCJcbiAgLy8gYnVpbGRlciBoYXMgYmVlbiBjaGFuZ2VkLCB3ZSB3YXJuIGJlY2F1c2UgYSB0aGVtZSBpcyBub3QgbWFuZGF0b3J5IGZvciBydW5uaW5nIHRlc3RzXG4gIC8vIHdpdGggTWF0ZXJpYWwuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY29tcG9uZW50cy9pc3N1ZXMvMTQxNzZcbiAgaWYgKCFpc0RlZmF1bHRCdWlsZGVyICYmIHRhcmdldE5hbWUgPT09ICdidWlsZCcpIHtcbiAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgWW91ciBwcm9qZWN0IGlzIG5vdCB1c2luZyB0aGUgZGVmYXVsdCBidWlsZGVycyBmb3IgYCArXG4gICAgICBgXCIke3RhcmdldE5hbWV9XCIuIFRoZSBBbmd1bGFyIE1hdGVyaWFsIHNjaGVtYXRpY3MgY2Fubm90IGFkZCBhIHRoZW1lIHRvIHRoZSB3b3Jrc3BhY2UgYCArXG4gICAgICBgY29uZmlndXJhdGlvbiBpZiB0aGUgYnVpbGRlciBoYXMgYmVlbiBjaGFuZ2VkLmApO1xuICB9IGVsc2UgaWYgKCFpc0RlZmF1bHRCdWlsZGVyKSB7XG4gICAgLy8gZm9yIG5vbi1idWlsZCB0YXJnZXRzIHdlIGdyYWNlZnVsbHkgcmVwb3J0IHRoZSBlcnJvciB3aXRob3V0IGFjdHVhbGx5IGFib3J0aW5nIHRoZVxuICAgIC8vIHNldHVwIHNjaGVtYXRpYy4gVGhpcyBpcyBiZWNhdXNlIGEgdGhlbWUgaXMgbm90IG1hbmRhdG9yeSBmb3IgcnVubmluZyB0ZXN0cy5cbiAgICBsb2dnZXIud2FybihgWW91ciBwcm9qZWN0IGlzIG5vdCB1c2luZyB0aGUgZGVmYXVsdCBidWlsZGVycyBmb3IgXCIke3RhcmdldE5hbWV9XCIuIFRoaXMgYCArXG4gICAgICBgbWVhbnMgdGhhdCB3ZSBjYW5ub3QgYWRkIHRoZSBjb25maWd1cmVkIHRoZW1lIHRvIHRoZSBcIiR7dGFyZ2V0TmFtZX1cIiB0YXJnZXQuYCk7XG4gIH1cblxuICByZXR1cm4gaXNEZWZhdWx0QnVpbGRlcjtcbn1cbiJdfQ==