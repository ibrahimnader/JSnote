import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localForage from "localforage";
const fileCashe = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (userInput: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, async () => {
        return {
          loader: "jsx",
          contents: userInput,
        };
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cashedResult = await fileCashe.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cashedResult) {
          return cashedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const escapedCss = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/, "\\'");
        const content = `
        const style = document.createElement('style'); 
        style.innerText='${escapedCss}';
        document.head.appendChild(style);
         `;
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: content,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCashe.setItem(args.path, result);
        return result;
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await fileCashe.setItem(args.path, result);
        return result;
      });
    },
  };
};
