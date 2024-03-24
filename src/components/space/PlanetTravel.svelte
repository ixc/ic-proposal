<script>
    import { onMount } from 'svelte';
    import planetDistances from '../../data/planetDistances.json';
    import vehicleSpeeds from '../../data/vehicleSpeeds.json';
    import SelectBox from './SelectBox.svelte';
    import RowLayout from './RowLayout.svelte'
    import SectionLayout from './SectionLayout.svelte';

    let monthOptions;
    let monthSelect;
    let planetCollection = [];
    let planetSelect;
    let prevMonthSelect;
    let prevPlanetSelect;
    let displayDistance;
    let vehicleSelect;
    let prevVehicleSelect;
    let vehicleCollection = [];
    let sliderValue;
    let prevSliderValue;
    let selectSpeed;
    let selectTravelTimeString;
    let selectPlanetImageUrl;
    let selectVehicleImageUrl;
  
    // Call calculateDistances function on mount
    onMount(() => {
        const currentDate = new Date();
        monthOptions = Object.keys(planetDistances)
        planetCollection = Object.keys(planetDistances["Jan-2024"])
        vehicleCollection = Object.keys(vehicleSpeeds)
        setInitialValues(currentDate)
    });

    const planetChange = e => {
        planetSelect = e.target.value
        selectPlanetImageUrl = `/images/space/${planetSelect}.jpg`
    }

    const vehicleChange = e => {
        vehicleSelect = e.target.value
        selectVehicleImageUrl = `/images/space/${vehicleSelect}.jpg`
    }

    const setInitialValues = (date) => {
        const currentMonth = date.getMonth()
        sliderValue = currentMonth * 100
        planetSelect = 'Mars'
        vehicleSelect = 'Toyota-Corolla'
        selectPlanetImageUrl = `/images/space/${planetSelect}.jpg`
        selectVehicleImageUrl = `/images/space/${vehicleSelect}.jpg`
    }

    const calculateTimeToTravel = (distance, speed) => {
        // Convert speed from km/h to km/min (1 hour = 60 minutes)
        const speedKmPerMin = speed / 60;
        // Calculate time in minutes
        const timeInMinutes = distance / speedKmPerMin;
        // Convert time from minutes to hours and minutes
        const years = Math.floor(timeInMinutes / (60 * 24 * 365));
        const days = Math.floor((timeInMinutes % (60 * 24 * 365)) / (60 * 24));
        const hours = Math.floor((timeInMinutes % (60 * 24)) / 60);
        const minutes = Math.round(timeInMinutes % 60);
        return { years, days, hours, minutes };
    }

    // update selected month on slider movement
    $: {
        if(sliderValue != prevSliderValue){
            prevSliderValue = sliderValue
            const index = Math.floor(sliderValue / 100)
            monthSelect = monthOptions[index]
        }
    }

    // update results on form changes
    $: {
        if (monthSelect != prevMonthSelect || planetSelect != prevPlanetSelect || vehicleSelect != prevVehicleSelect){
            prevMonthSelect = monthSelect
            prevPlanetSelect = planetSelect
            prevVehicleSelect = vehicleSelect
            const selectDistance = planetDistances[monthSelect][planetSelect] * 1000000
            displayDistance = selectDistance / 1000000
            selectSpeed = vehicleSpeeds[vehicleSelect]['top_speed']
            const selectTravelTime = calculateTimeToTravel(selectDistance, selectSpeed)
            selectTravelTimeString = `${selectTravelTime.years} years, ${selectTravelTime.days} days & ${selectTravelTime.hours} hours`
        }
    }
</script>


<main class="text-center p-10">
    <h1 class="text-3xl text-green-900 font-bold mb-6">Travel Time & Distance From Earth</h1>

    <SectionLayout>
        <div class="flex flex-col items-start">
            <label for="dateSlider" class="text-gray-700">Change Date:</label>
            <input type="range" id="dateSlider" class="w-full" min="0" max="1100" step="1" bind:value={sliderValue} />
            <span class="text-gray-500 text-xs">Slide to change date</span>
            <span class="text-gray-700 my-2">Travel Month: <span class="text-blue-800 font-semibold">{monthSelect}</span></span>
        </div>    
        
        <div class="w-full flex flex-col lg:flex-row">
            <div class="w-full lg:w-1/2">
                <div class="w-full">
                    <RowLayout>
                        <SelectBox 
                            collection={planetCollection}
                            onChangeHandler={planetChange}
                            selectID='planetOption'
                            label='Select Destination'
                            bind:bindValue={planetSelect}
                        />
                    </RowLayout>
                    <RowLayout>
                        <SelectBox 
                            collection={vehicleCollection}
                            onChangeHandler={vehicleChange}
                            selectID='vehicleOption'
                            label='Select Vehicle'
                            bind:bindValue={vehicleSelect}
                        />
                    </RowLayout>
                </div>
            </div>
            <div class="w-full lg:w-1/2 flex flex-col lg:flex-row">
                <div class="bg-white w-full lg:w-1/2 flex items-center justify-center p-2">
                    <img src={selectPlanetImageUrl} alt="planet" class="w-56 h-56 object-cover">
                </div>
                <div class="bg-white w-full lg:w-1/2 flex items-center justify-center p-2">
                    <img src={selectVehicleImageUrl} alt="vehicle" class="w-56 h-56 object-cover">
                </div>
            </div>
        </div>        
    </SectionLayout>
    <SectionLayout>
        <ul class="divide-y divide-gray-300">
            <li class="flex justify-between py-2">
                <span class="font-semibold">Travel Distance:</span>
                <span>{displayDistance} million kms</span>
            </li>
            <li class="flex justify-between py-2">
                <span class="font-semibold">Travel Speed:</span>
                <span>{selectSpeed} km/h</span>
            </li>
            <li class="flex justify-between py-2">
                <span class="font-semibold">Travel Time:</span>
                <span>{selectTravelTimeString}</span>
            </li>
        </ul>
    </SectionLayout>
</main>
  