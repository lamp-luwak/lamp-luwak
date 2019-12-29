

export function event(name: string) {
	return new String(name);
}

export function listen(event: object) {

}

export function dispatch(event: object, data: any) {

}


class A {

	static ItemAddedEvent = event("item_added");

	@listen(A.ItemAddedEvent)
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
// Ключ это непосредственно событие. Т.е. мы должны создать событие прежде чем его использовать
// Хороший пример события это symbol
// Нужен интернет, что бы доку смотреть, бред без интернета я и строчки написать не смогу
