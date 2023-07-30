<template>
  <ClientOnly>
    <header class="shadow">
      <nav class="w-full max-h-20 p-4 lg:px-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/">
            <img src="~/assets/img/logo.png" alt="logo" class="w-12 h-12" />
          </NuxtLink>

          <div class="flex items-center gap-x-4">
            <div
              class="flex items-center justify-center shadow rounded-md pr-2"
            >
              <UTooltip text="Click to create new invoice">
                <UButton
                  icon="i-ant-design-dollar-circle-outlined"
                  @click="openSidebar"
                  size="sm"
                  square
                  variant="ghost"
                />
              </UTooltip>
              <span class="text-sm mr-2">or</span>
              <UKbd v-if="OS === 'Macintosh'">⌘</UKbd>
              <UKbd v-if="OS === 'Windows OS'">Ctrl</UKbd>
              <UKbd>K</UKbd>
            </div>

            <UButton
              :icon="
                isDark
                  ? 'i-heroicons-moon-20-solid'
                  : 'i-heroicons-sun-20-solid'
              "
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
            />

            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
              <UAvatar
                :src="
                  avatar_url
                    ? avatar_url
                    : 'https://avatars.githubusercontent.com/u/739984?v=4'
                "
                :alt="data?.full_name"
              />

              <template #account="{ item }">
                <div class="text-left">
                  <p>Signed in as</p>
                  <p class="truncate font-medium text-gray-900 dark:text-white">
                    {{ item.label }}
                  </p>
                </div>
              </template>

              <template #item="{ item }">
                <span class="truncate">{{ item.label }}</span>

                <UIcon
                  :name="item.icon"
                  class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
                />
              </template>
            </UDropdown>
          </div>
        </div>
      </nav>
    </header>
  </ClientOnly>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const props = defineProps(['isOpen']);
const emit = defineEmits(['open-sidebar']);

const router = useRouter();
const client = useSupabaseAuthClient();

const avatar_url = ref('');

let { data } = await supabase
  .from('profiles')
  .select('username, full_name, avatar_url')
  .eq('id', user.value.id)
  .single();

const { data: fetchAvatar, error } = await supabase.storage
  .from('avatars')
  .download(data.avatar_url);
if (error) throw error;
avatar_url.value = URL.createObjectURL(fetchAvatar);

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

function openSidebar() {
  emit('open-sidebar');
}

const items = [
  [
    {
      label: 'Profile',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4',
      },
      click: () => {
        router.push('/profile');
      },
    },
  ],
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      shortcuts: ['E'],
      click: () => {
        console.log('Edit');
      },
    },
    {
      label: 'Archive',
      icon: 'i-heroicons-archive-box-20-solid',
    },
    {
      label: 'Duplicate',
      icon: 'i-heroicons-document-duplicate-20-solid',
      shortcuts: ['D'],
      disabled: true,
    },
  ],

  [
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-right-circle-20-solid',
      shortcuts: ['⌘', 'D'],
      click: () => {
        client.auth.signOut();
        router.push('/');
      },
    },
  ],
];

const OS = ref('');
if (navigator.userAgent.indexOf('Win') != -1) OS.value = 'Windows OS';
if (navigator.userAgent.indexOf('Mac') != -1) OS.value = 'Macintosh';
if (navigator.userAgent.indexOf('Linux') != -1) OS.value = 'Linux OS';
if (navigator.userAgent.indexOf('Android') != -1) OS.value = 'Android OS';
if (navigator.userAgent.indexOf('like Mac') != -1) OS.value = 'iOS';
</script>
