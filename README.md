# 🍰 Sweet Regrets - Fictional Bakery Ordering App

**Sweet Regrets** is a fictional bakery ordering app built with ❤️ using [React](https://react.dev), [Supabase](https://supabase.com), and the [Google Maps API](https://developers.google.com/maps/documentation). 

Inspired by the way we all sometimes give in to indulgence, whether it’s a comforting dessert or a choice we make, knowing it might not be the best decision for us. Sweet Regrets is about accepting those moments for what they are. It’s not about glorifying bad choices, it’s about understanding their place in life, and accepting that we don’t always make perfect choices — and that’s okay.

## Built With
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](#)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)](#)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0FC8?logo=daisyui&logoColor=white)](#)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)](#)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white)](#)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?logo=redux&logoColor=white)](#)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](#)

## Features
- **Browse menu** of desserts and baked goods  
- **Place orders** for delivery or pickup  
- **Address autofill** via Geolocation API and Geocoding API
- **Distance-based delivery fee** calculation with Distance Matrix API
- **Dynamic arrival or pickup time** based on your real-time location  
- **Receipt generation** after successful order placement  
- **Track order status** in real-time  
- **Dark mode toggle**   

## Distance-based Delivery Fee Logic
Delivery fees are calculated based on the distance between the fictional bakery and user's location, ensuring fairness and transparency.

**Formula:**
```Total Delivery Fee = Base Fee + ceil((Distance - Max Base Distance) × Extra Charge per kilometer)```

**Where:**
- **Base Fee:** $2 for deliveries within 5 km.
- **Max Base Distance:** 5 km.
- **Extra Charge per KM:** $0.50 for each kilometer beyond the base distance.
- **ceil() Function:** Ensures that any fractional extra distance results in a full additional charge.

## Dynamic Arrival or Pickup Time Logic
Delivery fees are calculated based on the distance between the fictional bakery and user's location, ensuring fairness and transparency.

**Formula:** <br/>
```Pickup Time = Current Time + Base Preparation Time```<br/>
```Arrival Time = Current Time + Base Preparation Time + Travel Time```

**Where:**
- **Base Preparation Time:** A fixed 30-minute buffer applied to all orders to account for baking and packing.
- **Travel Time: Real-time** duration from the bakery to the customer’s location, calculated using the Google Maps Distance Matrix API.

## Preview

![sweet-regrets](https://github.com/user-attachments/assets/ec061aed-8595-42d4-b4d1-806194ca82e3)

[**View Live Site** 🌐](https://sweet-regrets.vercel.app/)



