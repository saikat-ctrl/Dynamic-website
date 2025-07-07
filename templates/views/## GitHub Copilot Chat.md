## GitHub Copilot Chat

- Extension Version: 0.28.5 (prod)
- VS Code: vscode/1.101.2
- OS: Windows

## Network

User Settings:
```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 20.207.73.85 (34 ms)
- DNS ipv6 Lookup: timed out after 10 seconds
- Proxy URL: None (2 ms)
- Electron fetch (configured): timed out after 10 seconds
- Node.js https: timed out after 10 seconds
- Node.js fetch: Error (7402 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:13510:13
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at cN._fetch (c:\Users\SAIKAT RAY\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:1039:7812)
    at c:\Users\SAIKAT RAY\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:1070:134
    at Xb.h (file:///c:/Users/SAIKAT%20RAY/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:120:41516)
  Error: read ECONNRESET
      at TLSWrap.onStreamRead (node:internal/stream_base_commons:216:20)
- Helix fetch: Error (475 ms): FetchError: getaddrinfo ENOTFOUND api.github.com
    at VRt (c:\Users\SAIKAT RAY\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:330:29579)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at rqr (c:\Users\SAIKAT RAY\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:330:31605)
    at Rb.fetch (c:\Users\SAIKAT RAY\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:1040:2495)
    at c:\Users\SAIKAT RAY\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:1070:134
    at Xb.h (file:///c:/Users/SAIKAT%20RAY/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:120:41516)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: Error (17 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- DNS ipv6 Lookup: Error (1 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Proxy URL: None (1837 ms)
- Electron fetch (configured): Error (4 ms): Error: net::ERR_INTERNET_DISCONNECTED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10635)
    at SimpleURLLoaderWrapper.emit (node:events:518:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
- Node.js https: Error (45 ms): Error: getaddrinfo ENOTFOUND api.individual.githubcopilot.com
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
- Node.js fetch: Error (139 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:13510:13
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at cN._fetch (c:\Users\SAIKAT RAY\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:1039:7812)
    at c:\Users\SAIKAT RAY\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:1070:134
    at Xb.h (file:///c:/Users/SAIKAT%20RAY/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:120:41516)
  Error: getaddrinfo ENOTFOUND api.individual.githubcopilot.com
      at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
- Helix fetch: Error (100 ms): FetchError: getaddrinfo ENOTFOUND api.individual.githubcopilot.com
    at VRt (c:\Users\SAIKAT RAY\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:330:29579)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at rqr (c:\Users\SAIKAT RAY\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:330:31605)
    at Rb.fetch (c:\Users\SAIKAT RAY\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:1040:2495)
    at c:\Users\SAIKAT RAY\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:1070:134
    at Xb.h (file:///c:/Users/SAIKAT%20RAY/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:120:41516)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).