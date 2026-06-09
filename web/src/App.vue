<template>
    <el-config-provider :value-on-clear="() => null">
        <router-view></router-view>
    </el-config-provider>
</template>

<script setup lang="ts"></script>
