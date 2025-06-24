<script>
  import { onMount } from 'svelte';
  
  let progress = 0;

  onMount(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progress = (scrollTop / docHeight) * 100;
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  });
</script>

<div class="reading-progress">
  <div 
    class="reading-progress__bar" 
    style="width: {progress}%"
  ></div>
</div>

<style>
  .reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(0, 0, 0, 0.1);
    z-index: 9999;
  }

  .reading-progress__bar {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    transition: width 0.1s ease-out;
    border-radius: 0 2px 2px 0;
  }

  :global(.dark) .reading-progress {
    background: rgba(255, 255, 255, 0.1);
  }
</style>