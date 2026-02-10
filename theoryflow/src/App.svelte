<script>
  import Router from 'svelte-spa-router'
  import Sidebar from './components/Sidebar.svelte'
  import Automata from './pages/Automata.svelte'
  import Trees from './pages/Trees.svelte'
  import Turing from './pages/Turing.svelte'

  const routes = {
    '/': Automata,
    '/automata': Automata,
    '/trees': Trees,
    '/turing': Turing,
  }
</script>

<div class="page-viewport">
  <header class="site-header">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-md bg-brand-400 flex items-center justify-center text-white font-bold">TF</div>
        <div>
          <div class="site-title">TheoryFlow</div>
          <div class="text-sm text-gray-500">Interactive CS visualizations</div>
        </div>
      </div>
    </div>
  </header>

  <div class="app-shell max-w-7xl mx-auto">
    <aside class="sidebar">
      <Sidebar />
    </aside>
    <main class="main-area">
      <div class="space-y-6">
        <Router {routes} />
      </div>
    </main>
  </div>
</div>

<style>
  /* component-level spacing handled by Tailwind */
</style>
