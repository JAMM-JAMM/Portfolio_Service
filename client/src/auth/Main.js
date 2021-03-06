import React from 'react';
import { Carousel, Container } from 'react-bootstrap';


export default function Main() {

    return (
        <>
            <div className="carousel">
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="image/gray.jpg"
                    alt="First slide"
                    height={600}
                    width={700}
                    />
                    <Carousel.Caption>
                    <h3>WelCome! Racer Portfolio Service</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="image/portfolio.jpg"
                    alt="Second slide"
                    height={600}
                    width={700}
                    />

                    <Carousel.Caption>
                    <h3>My Portfolio</h3>
                    <p>Click Myportfolio on the navigation menu in the upper right corner.</p>
                    <p>You can register, modify, and delete your portfolio.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="image/people1.jpg"
                    alt="Third slide"
                    height={600}
                    width={700}
                    />

                    <Carousel.Caption>
                    <h3>Network</h3>
                    <p>Click Network on the navigation menu in the upper right corner.</p>
                    <p>You can view the portfolio of users registered on this page,</p>
                    <p>and you can also search for and view the names of users you want to view.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>
        </>
    )
}

