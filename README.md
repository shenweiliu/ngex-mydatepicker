# ngex-mydatepicker

An Angular datepicker library and sample applications upgraded from the original [angular-mydatepicker](https://github.com/kekeh/angular-mydatepicker) with the structure of standalone and   Angular version 19.

## Installation

Run `npm install ngex-mydatepicker` to add the library into your project directory, or add `"ngex-mydatepicker": "~19.0.3"` to the package.json file and then run `npm install` to update the existing file.

## What Are Changed?

The `ngex-mydatepicker` doesn't change the functionanlity and features of the original `angular-mydatepicker`. All changes are related to internal files, code in the project, and requirements for the latest Angular and TypeScript.

- Used Angular standalone.
- Fixed a large number of TypeScript strict type-checking errors.
- Changed deprecated to supported code logic and scenarios.   
- Built and tested with Angular version 19.

## Details and Use Cases

The original [angular-mydatepicker](https://github.com/kekeh/angular-mydatepicker) and its [Wiki section](https://github.com/kekeh/angular-mydatepicker/wiki) provide full documents for how to set up and use the datepicker tool in Angular applications. Those documents are still valid for, and should work the same as, the `angular-mydatepicker` version.

## angular-sources_only

This folder contains the demo project that can be run in any platform with the regular Angular project setup.

## NgExmydatepicker_AspNetCore

It's the Visual Studio 2022 solution of the ASP.NET Core 9.0 website project containing the ngex-mydatepicker demo. You need to do the `npm install` in the directory *NgExMydatepicker_AspNetCore/SM.NgExMydatepicker.Sample/wwwroot/angular-content* for the *node_modules* and then run the `ng build --configuration {your environment}` before starting the website. 
