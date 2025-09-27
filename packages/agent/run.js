#!/usr/bin/env node
import {spawn} from "node:child_process";
const args=process.argv.slice(2);
const cmd=process.platform==="win32"?"npx.cmd":"npx";
spawn(cmd,["gemini",args.join(" ")||"Hello"],{stdio:"inherit"});
