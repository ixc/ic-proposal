<script>
    const PUBLIC_NASA_API_KEY = import.meta.env.PUBLIC_NASA_API_KEY;

    import { onMount } from 'svelte';

    let picOfTheDayUrl;
  
    onMount(() => {
        fetchImageOfTheDay()
    });

    const formatDate = (date) => {
        const year = date.getFullYear();
        const day = String(date.getDate()-1).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }

    const fetchImageOfTheDay = async () => {
        try {
            const currentDate = new Date();
            const formattedDate = formatDate(currentDate);
            const URL = `https://api.nasa.gov/planetary/apod?date=${formattedDate}&api_key=${PUBLIC_NASA_API_KEY}`
            const response = await fetch(URL);
            const data = await response.json();
            // Assuming the API response provides distances for each planet
            if ( data.media_type === 'image' ){
                picOfTheDayUrl = data.url
            }
        } catch (error) {
            console.error('Error fetching planet distances:', error);
        }
    };
</script>


<main class="text-center p-10">
    <h1 class="text-3xl text-green-900 font-bold mb-6">NASA, Photo of the Day</h1>

    <div class="w-full bg-gray-200 px-10 py-10 flex items-center justify-center">
        {#if picOfTheDayUrl }
            <img src={picOfTheDayUrl} alt="pic of the dat" class="h-96 shadow-2xl" >
        {:else }
            <span>No Image Today</span>
        {/if }
    </div>
</main>
  