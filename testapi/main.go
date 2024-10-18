package main

import (
	"io"
	"net/http"
)

func runApplication() error {
	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`[{"name": "John Doe"}, {"name": "Jane Doe"}]`))
	})

	http.HandleFunc("PATCH /users/me", func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		w.Write([]byte(`{"name": "John Doe"}`))
	})

	http.HandleFunc("POST /ping", func(w http.ResponseWriter, r *http.Request) {
		bodyBytes, _ := io.ReadAll(r.Body)
		r.Body.Close()

		w.Write(bodyBytes)
	})

	return http.ListenAndServe(":3030", nil)
}

func main() {
	panic(runApplication())
}
