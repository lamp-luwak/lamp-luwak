extern crate actix_web;
use actix_web::{server, App, HttpRequest, Responder};

fn tokenGet(req: HttpRequest) -> impl Responder {

    format!("Hello {}!", to)
}

fn main() {
    server::new(|| {
        App::new()
            .resource("/", |r| r.f(greet))
            .resource("/auth/token/get", |r| r.f(tokenGet))
    })
    .bind("127.0.0.1:8000")
    .expect("Can not bind to port 8000")
    .run();
}
