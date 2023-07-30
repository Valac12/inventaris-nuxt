<template>
  <UCard as="div" class="shadow-md border-none p-6">
    <div class="flex items-center justify-between">
      <div>
        <h5 class="text-2xl font-bold">
          <span class="text-gray-400 mr-0.5">#</span>{{ $route.params.id }}
        </h5>
        <span class="capitalize font-medium text-gray-500 dark:text-gray-400"
          >Nasi Kucing</span
        >
      </div>

      <div class="flex flex-col items-end text-sm">
        <span>BTN puskopad atas, Abepura</span>
        <span>Jayapura</span>
        <span>99351</span>
        <span>Indonesia</span>
      </div>
    </div>

    <div class="flex items-start justify-between mt-12 mb-10">
      <div class="flex flex-col justify-between gap-y-4">
        <div>
          <h6
            class="text-sm text-violet-500 dark:text-violet-400 font-medium mb-2"
          >
            Invoice Date
          </h6>
          <span class="font-semibold">21 August, 2023</span>
        </div>
        <div>
          <h6
            class="text-sm text-violet-500 dark:text-violet-400 font-medium mb-2"
          >
            Due date:
          </h6>
          <span class="font-semibold">28 September, 2023</span>
        </div>
      </div>

      <div class="flex flex-col justify-between gap-y-4">
        <div>
          <h5
            class="text-sm text-violet-500 dark:text-violet-400 font-medium mb-2"
          >
            Bill To
          </h5>
          <span class="font-semibold">Dini Abshari</span>
        </div>

        <div class="flex flex-col items-start text-sm">
          <span>BTN puskopad atas, Abepura</span>
          <span>Jayapura</span>
          <span>99351</span>
          <span>Indonesia</span>
        </div>
      </div>

      <div>
        <h5
          class="text-sm text-violet-500 dark:text-violet-400 font-medium mb-2"
        >
          Sent To
        </h5>
        <span class="font-semibold">Muhamad Alief</span>
      </div>
    </div>

    <div class="bg-gray-100 dark:bg-slate-800/90 p-6 rounded-lg">
      <table class="w-full">
        <tr class="flex gap-4 text-sm">
          <th class="font-light basis-1/2 text-start">Item Name</th>
          <th class="font-light basis-[10%] text-end">Quantity</th>
          <th class="font-light basis-1/5 text-end">Price</th>
          <th class="font-light self-center text-end basis-1/5">Total</th>
        </tr>
        <tr class="flex gap-4 text-sm mt-6">
          <td class="font-medium text-lg basis-1/2">Nasi Kucing</td>
          <td class="font-medium text-lg basis-[10%] text-end">4</td>
          <td class="font-medium text-lg basis-1/5 text-end">Rp. 15.0000</td>
          <td class="font-medium text-lg self-center basis-1/5 text-end">
            Rp. 60.000
          </td>
        </tr>
      </table>
    </div>
  </UCard>
</template>

<script setup></script>
