

export function listen() {

}

export function dispatch(event: any, data: any) {

}


class A {
	@listen("item_added")
	onItemAdded(data) {
		console.log(data);
	}
}

class B {
	add() {
		dispatch("item_added", "item_1_data");
	}
}

const b = new B();

// Как в таком кейсе обеспечить адекватное умирание A
// Это возможно только в том случае, если шина не будет иметь ссылок на A, а это доступно только
// в кейсе WeakMap, но из WeakMap мы не можем получить набор ключей и должны эти ключи знать
// Нужен интернет, что бы доку смотреть, бред без интернета я и строчки написать не смогу
