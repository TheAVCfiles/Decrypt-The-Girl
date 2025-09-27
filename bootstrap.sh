#!/bin/bash
set -euo pipefail
mkdir -p _archive apps/web/public packages/agent functions .gemini .gcp
for f in * .*; do [[ "$f" =~ ^(\.|\.\.|_archive|\.git|bootstrap.sh)$ ]] || mv "$f" _archive/ 2>/dev/null || true; done
cat > apps/web/public/index.html <<'HTML'
<!doctype html><html><body>
<h1>DeCrypt the Girl — Agent Console</h1>
<textarea id=prompt rows=6 style="width:100%"></textarea>
<button id=run>Run</button><pre id=out></pre>
<script type=module>
run.onclick=async()=>{let r=await fetch('/agent/run',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:prompt.value})});out.textContent=await r.text()}
</script></body></html>
HTML
cat > firebase.json <<'JSON' 
{"hosting":{"public":"apps/web/public","rewrites":[{"source":"/agent/**","function":"agent"}]},"functions":{"source":"functions"}}
JSON
cat > functions/index.js <<'JS'
import * as f from "firebase-functions";
export const agent=f.https.onRequest(async(req,res)=>{res.send(`Agent received: ${req.body?.prompt??"(none)"}`)});
JS
cat > packages/agent/run.js <<'JS'
#!/usr/bin/env node
import {spawn} from "node:child_process";
const args=process.argv.slice(2);
const cmd=process.platform==="win32"?"npx.cmd":"npx";
spawn(cmd,["gemini",args.join(" ")||"Hello"],{stdio:"inherit"});
JS
chmod +x packages/agent/run.js
cat > .gemini/config.yaml <<'YAML'
model: "gemini-1.5-pro"
playbooks:
  - name: "deploy default"
    prompt: "npm run deploy"
YAML
git add -A && git commit -m "chore: bootstrap clean repo with Firebase + Agent"
