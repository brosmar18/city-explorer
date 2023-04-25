import React from 'react';
import Form from './Form';

class Main extends React.Component{
    render(){
        return(
            <>
                <main className='main'>
                    <section className='city'>
                        <h2 className='city__title'>Find City</h2>
                        <p className='city__descripition'>Enter city name to see a map</p>
                        <Form />
                    </section>
                </main>
            </>
        )
    }
}


export default Main;
