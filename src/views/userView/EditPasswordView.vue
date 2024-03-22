<template>
	<body class="content">
		<div class="card flex justify-content-center">
			<div class="flex flex-column gap-3">
				<p>Hasło:</p>
				<div>
					<div class="card flex justify-content-center">
						<Password
							v-model.trim="inputPassword"
							toggleMask />
					</div>
				</div>
				<p>Potwierdź hasło:</p>
				<div>
					<div class="card flex justify-content-center">
						<Password
							v-model.trim="inputConfirmPassword"
							toggleMask />
					</div>
				</div>
			</div>
		</div>
		<div class="card flex justify-content-center mt-4 cursor-pointer">
			<Button
				@click="checkPassword"
				label="Załóż konto" />
		</div>
	</body>
</template>
<script setup>
import { ref } from "vue";
import Password from "primevue/password";
import Button from "primevue/button";

const inputPassword = ref("");
const inputConfirmPassword = ref("");
</script>
<style scoped></style>
