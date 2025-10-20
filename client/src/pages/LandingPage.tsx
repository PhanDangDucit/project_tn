import React from 'react';
import { Button, Hero } from 'react-daisyui';
import { Link } from 'react-router-dom';
const LandingPage: React.FC<object> = () => {
  return (
    <div className="relative">
      <Hero
        className="min-h-screen w-screen"
        style={{
          backgroundImage: `url('https://i.redd.it/6bal3fauy1hb1.jpg')`,
        }}
      >
        <Hero.Overlay />
        <Hero.Content className="text-center">
          <div className="">
            <h1 className="text-5xl font-bold text-white">
              Chào mừng đến với chúng tôi
            </h1>
            <p className="py-6 text-white">
              Hệ thống xăm hình uy tín, chất lượng với đội ngũ nhân viên tận tâm
              với nghề.
            </p>

            <div className="flex justify-center gap-3">
              <Link to="/auth/login">
                <Button color="primary" className="text-white">
                  Trải nghiệm hình xăm và đặt lịch
                </Button>
              </Link>
            </div>
          </div>
        </Hero.Content>
      </Hero>
    </div>
  );
};

export default LandingPage;
