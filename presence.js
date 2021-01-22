'use strict';

import RPC from 'discord-rpc';
import fs from 'fs';

const client = new RPC.Client({ transport: 'ipc' })

let rawdata = fs.readFileSync('options.json');
let options = JSON.parse(rawdata);

//console.log(options);

let assets = {};
if (options['largeimage'] !== '') { assets.large_image = options['largeimage']; }
if (options['smallimage'] !== '') { assets.small_image = options['smallimage']; }

client.on('ready', () => {
    client.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: {
            assets: assets,
            details: options['description'],
            buttons: options['buttons']
        }
      })
    console.log('Your Rich Presence has started! Generated by https://github.com/ThatOneCalculator/DiscordRPCGenerator')
})

client.login({clientId: options['clientid']})