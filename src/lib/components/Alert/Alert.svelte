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
    background-color: #dcdada;
    color: #6c6565;
  }

  .variant-success {
    background-color: #a5e4b6;
    color: #267e3d;
  }

  .variant-error {
    background-color: #e8a1a1;
    color: #ad2b2b;
  }
</style>
