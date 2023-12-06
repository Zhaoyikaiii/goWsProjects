package main

import (
	"github.com/Zhaoyikaiii/wsDemo/internal/handlers"
	"github.com/bmizerany/pat"
	"net/http"
)

func routes() http.Handler {
	mux := pat.New()

	mux.Get("/", http.HandlerFunc(handlers.Home))
	mux.Get("/ws", http.HandlerFunc(handlers.WsEndpoint))
	fs := http.FileServer(http.Dir("./static/"))
	mux.Get("/static/", http.StripPrefix("/static", fs))
	return mux
}
