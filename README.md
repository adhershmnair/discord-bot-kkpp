# KKPP Reality RolePlay.

Node version >= ```v18.20.4```

Install yarn

```npm install -g yarn```

Install Packages

```yarn install```


Copy ```.env.example``` file and rename to ```.env```

Update ```src/configuration/discordConfigs.js``` file with proper discord roles and channel ids.

Run server

```yarn run dev```


Ptero Config

```npm install nodemon; if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install --production; fi; /home/container/node_modules/nodemon/bin/nodemon.js  --config /home/container/nodemon.json --legacy-watch /home/container/{{BOT_JS_FILE}}```
