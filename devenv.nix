# https://devenv.sh/reference/options

{ inputs, pkgs, ... }:
let
  pkgs-unstable = import inputs.nixpkgs-unstable { system = pkgs.stdenv.system; };
in
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
    commitizen = {
      enable = true;
      package = pkgs-unstable.commitizen;
    };

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
