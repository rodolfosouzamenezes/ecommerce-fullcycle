package main

import "fmt"

type Product struct {
	ID    int
	Name  string
	Price float64
}

func (p Product) getPrice() float64 {
	return p.Price
}

func soma(x, y int) int {
	return x + y
}

func main() {
	carrinho := Product{1, "Maça", 10.00}
	fmt.Println(carrinho.getPrice())
}
