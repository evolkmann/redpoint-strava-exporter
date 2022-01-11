# redpoint-strava-exporter

![https://img.shields.io/badge/status-experimental-red](https://img.shields.io/badge/status-experimental-red)

A set of tools for exporting climbing activities tracked with the
[Redpoint App](https://redpoint-app.com/) as [Strava](https://www.strava.com/)
activities.

## Status

The exported activities are not yet perfect and will probably be improved
as I generate more test data over time :)

Currently, the project can only be used via the [CLI](./packages/cli).
I plan to provide a web app, maybe even a proper Strava API integration.

The generated files (GPX and description) must currently be updated manually via
the [Strava API](https://developers.strava.com/docs/reference/#api-Uploads-createUpload).

## Motivation

I was not satisfied with the default Strava export that Redpoint uses for
a couple of reasons:
- Description is not customizable or localized
- *Active Time* and *Elevation* are calculated poorly based on the exported GPS data

This project aims to provide an open, customizable and hopefully more accurate
export utility.
