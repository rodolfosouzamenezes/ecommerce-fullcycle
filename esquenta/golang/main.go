package main

import (
	"fmt"
	"time"
)

func worker(workwerID int, data chan int) {
	for x := range data {
		fmt.Printf("Worker %d recebeu %d\n", workwerID, x)
		time.Sleep(time.Second)
	}
}

func main() {
	data := make(chan int)

	qtdWorkers := 100000
	for i := 0; i < qtdWorkers; i++ {
		go worker(i, data)
	}

	for i := 0; i < 1000000; i++ {
		data <- i
	}
}
