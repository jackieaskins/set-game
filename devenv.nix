# https://devenv.sh/reference/options

{ ... }:
{
  languages = {
    javascript = {
      enable = true;
      npm.enable = true;
      pnpm = {
        enable = true;
        install.enable = true;
      };
    };

    typescript.enable = true;
  };

  git-hooks.hooks = {
    commitizen.enable = true;

    eslint = {
      enable = true;
      settings = {
        binPath = "./node_modules/.bin/eslint";
        extensions = "\.(js|ts|svelte)$";
      };
    };

    prettier = {
      enable = true;
      settings = {
        binPath = "./node_modules/.bin/prettier";
        configPath = "./.prettierrc";
      };
    };
  };
}
