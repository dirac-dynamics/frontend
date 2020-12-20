<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://dirac-dynamics.github.io/landingpage/" target="_blank">Rome</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} Dirac Dynamics.</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="https://dirac-dynamics.github.io/landingpage/">Dirac Dynamics</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
