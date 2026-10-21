<script lang="ts">
  import type { MessageType } from "$lib/types";
  import type { Snippet } from "svelte";

  export interface AlertProps {
    children: Snippet;
    variant?: MessageType;
  }

  let { children, variant = "default" }: AlertProps = $props();
</script>

<div class="alert variant-{variant}">
  {@render children()}
</div>

<style>
  .alert {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    border: 2px solid;
    padding: 10px;

    text-align: center;

    font-size: 0.8rem;
    font-weight: bold;
  }

  .variant-default {
    background-color: light-dark(#dcdada, #3a3838);
    color: light-dark(#6c6565, #b0a8a8);
  }

  .variant-success {
    background-color: light-dark(#a5e4b6, #1a4a2a);
    color: light-dark(#267e3d, #7ed69a);
  }

  .variant-error {
    background-color: light-dark(#e8a1a1, #4a1e1e);
    color: light-dark(#ad2b2b, #e88a8a);
  }

  .variant-warning {
    background-color: light-dark(#f0e3a3, #4a3f1a);
    color: light-dark(#7a5c0f, #e8d48a);
  }
</style>
