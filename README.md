# Kibana Extended Metric Plugin

This is a plugin for [Kibana 5.x](https://www.elastic.co/products/kibana) and [Kibana 7.x]((https://www.elastic.co/products/kibana).
It is based on the core Metric-Plugin but gives you the ability to output custom aggregates on metric-results by using custom formula and/or JavaScript.


**Kibana 5 demo**  
![image](img/demo.gif)

## Installation
Only works for some Kibana-versions (sorry, I don't have the time to release a new version for every update, but you can choose the closest version and simply adjust the version-number in the `package.json`))

**5.0.0**

```sh
$ ./bin/kibana-plugin install https://github.com/ommsolutions/kibana_ext_metrics_vis/releases/download/0.1.0/extended_metric_vis.zip
```

**5.5.0**

```sh
$ ./bin/kibana-plugin install https://github.com/ommsolutions/kibana_ext_metrics_vis/releases/download/5.5.0/kibana_ext_metrics_vis_5.5.0.zip
```

**5.5.2**

```sh
$ ./bin/kibana-plugin install https://github.com/ommsolutions/kibana_ext_metrics_vis/releases/download/5.5.2/kibana_ext_metrics_vis_5.5.2.zip
```

**5.6.5**

```sh
$ ./bin/kibana-plugin install https://github.com/ommsolutions/kibana_ext_metrics_vis/releases/download/5.6.5/kibana_ext_metrics_vis_5.6.5.zip
```

**7.4.2**

```sh
$ ./bin/kibana-plugin install https://github.com/ommsolutions/kibana_ext_metrics_vis/releases/download/7.4.2/extended_metric_vis-7.4.2.zip
```

### Manual
(for other versions: e.g. 5.1.0)

Extract the ZIP into a new folder in your `kibana/plugins`-directory.

## Uninstall

Simply delete that folder or use ./bin/kibana-plugin install and restart kibana.

## Development
1) Clone or fork the Kibana repository
2) Clone this repo inside the default place for Kibana plugins kibana/plugins/* and run the Kibana-specific commands to setup
the project (e.g. yarn kbn bootstrap) 
