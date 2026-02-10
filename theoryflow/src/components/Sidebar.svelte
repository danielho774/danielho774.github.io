<script>
  const items = [
    { href: '#/automata', label: 'Automata' },
    { href: '#/trees', label: 'Trees' },
    { href: '#/turing', label: 'Turing Machines' },
  ]

  // active detection for hashed routes
  const currentHash = () => window.location.hash.replace('#','') || '/'
</script>

<nav class="p-6">
  <div class="mb-6">
    <div class="text-sm text-gray-500">Explore</div>
  </div>
  <ul class="space-y-2">
    {#each items as it}
      <li>
        <a
          href={it.href}
          class="block px-4 py-2 rounded-md text-sky-700 hover:bg-brand-50"
          aria-current={currentHash() === it.href.replace('#','') ? 'page' : undefined}
        >
          {it.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>
