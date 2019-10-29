#Environment + Introduction

Hi, i want to propose a kind of documentation of my project with this blog here.

You can see the repo here [tictactoe monorepo](https://github.com/Habakuk90/tictactoe) . [first commit](https://github.com/Habakuk90/tictactoe/commit/4bdee156a3d5dc25e999391007f5200ed2a02ae8)

I am using an IaaS service provided by netcup. The initial setup is a ubuntu 18 environment, (configuration bloglink). Also installed is the docker CE. The applications are running all in a docker container.  See docker configuration files in the repo (these will be explained in the documentation (link).

[docker file angular]()
[docker file ]()
[docker file mssql]()


To get all the container to work together we are configuring our nginx proxy to direct the visitor to their respective subdomain. Hosted as api.andkra.eu which will again proxy the requests respectively but inside a network.

See the blog post for the nginx proxy (link)

See also migrating from nginx to envoy proxy with the help of [katacoda:envoyproxy](https://www.katacoda.com/envoyproxy/scenarios/migrating-from-nginx-to-envoy)

As we all love the open-source community (which I haven’t yet really contributed to) all of the tools are available to use. Github.com plus Travis-CI, works like a charm once you get the configuration done for your travis.yml (link configuration) ([image] setup travis commits)
If you are reading this article on blog.andkra.eu, you are visiting a ghost-cms (link) container with the standard template, I am using this also as a headless resource for app.andkra.eu.  
The app is a angular application which is also running in a container hosted with nginx. 

[CODE] either docker-compose.yml or envoy-proxy.config

[/CODE]






# envoy-proxy
``` yaml 
static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address: { address: 0.0.0.0, port_value: 8080 }
    filter_chains:
    - filters:
      - name: envoy.http_connection_manager
        config:
          codec_type: auto
          stat_prefix: ingress_http
          access_log:
          - name: envoy.file_access_log
            config:
                path: "/dev/stdout"
                format: "[%START_TIME%] "%REQ(:METHOD)% %REQ(X-ENVOY-ORIGINAL-PATH?:PATH)% %PROTOCOL%" %RESPONSE_CODE% %RESP(X-ENVOY-UPSTREAM-SERVICE-TIME)% "%REQ(X-REQUEST-ID)%" "%REQ(:AUTHORITY)%" "%UPSTREAM_HOST%"\n"
          route_config:
            name: local_route
            virtual_hosts:
            - name: backend
              domains:
                - "one.example.com"
                - "www.one.example.com"
              routes:
              - match:
                  prefix: "/"
                route:
                  cluster: targetCluster
          http_filters:
          - name: envoy.router
  clusters:
  - name: targetCluster
    connect_timeout: 0.25s
    type: STRICT_DNS
    dns_lookup_family: V4_ONLY
    lb_policy: ROUND_ROBIN
    hosts: [
      { socket_address: { address: 172.18.0.3, port_value: 80 }},
      { socket_address: { address: 172.18.0.4, port_value: 80 }}
    ]
```