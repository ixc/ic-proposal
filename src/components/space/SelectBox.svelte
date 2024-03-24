<script>
    export let collection = [];
    export let bindValue;
    export let onChangeHandler;
    export let selectID;
    export let label;
</script>


<div class="flex flex-col items-start">
    <label for={selectID} class="text-gray-700">{label}:</label>
    <div class="w-full md:max-w-96">
        <select id={selectID} class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400" bind:value={bindValue} on:change={onChangeHandler}>
            {#each collection as option}
                <option value={option} class="text-gray-900">{option}</option>
            {/each}
        </select>
    </div>
</div>
