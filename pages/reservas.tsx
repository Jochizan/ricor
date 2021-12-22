// basic form for restaurant reservations with tailwind css
import type { NextPage } from 'next';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ImageReservas from 'public/restaurantReservaciones.png';
import * as Yup from 'yup';
import Meta from '@components/Meta';

const ReservaSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellido: Yup.string().required('El apellido es obligatorio'),
  telefono: Yup.string().required('El teléfono es obligatorio'),
  fecha: Yup.string().required('La fecha es obligatoria'),
  hora: Yup.string().required('La hora es obligatoria'),
  personas: Yup.number().required('El número de personas es obligatorio')
});

const ReservationPage: NextPage = () => {
  return (
    <main
      className='flex-grow flex justify-center items-center p-4 bg-fixed'
      style={{
        backgroundImage: 'url(' + ImageReservas.src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Meta title='Ricor' description='Reservas' image={ImageReservas} />
      <div className='max-w-screen-sm w-full mt-16 h-min w-screen-lg bg-amber-300 dark:bg-amber-900 px-4 pb-4 rounded-lg'>
        <h2 className='text-3xl p-4 text-stone-700 dark:text-stone-100 font-medium'>
          Reservaciones
        </h2>
        <Formik
          initialValues={{
            nombre: '',
            apellido: '',
            telefono: '',
            fecha: '',
            hora: '',
            personas: ''
          }}
          validationSchema={ReservaSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className='flex flex-col items-center justify-center w-full'>
              <div className='flex flex-col items-center justify-center w-full text-stone-700 dark:text-stone-100 font-medium'>
                <div className='w-full'>
                  <label htmlFor='nombre'>Nombre</label>
                  <Field
                    className='bg-stone-200 appearance-none border-2 border-stone-200 rounded w-full py-2 px-4 text-stone-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500'
                    id='nombre'
                    type='text'
                    name='nombre'
                  />
                  <ErrorMessage
                    className='text-red-500 text-sm'
                    component='span'
                    name='nombre'
                  />
                </div>
                <div className='w-full mt-4'>
                  <label htmlFor='apellido'>Apellido</label>
                  <Field
                    className='bg-stone-200 appearance-none border-2 border-stone-200 rounded w-full py-2 px-4 text-stone-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500'
                    id='apellido'
                    type='text'
                    name='apellido'
                  />
                  <ErrorMessage
                    className='text-red-500 text-sm'
                    component='span'
                    name='apellido'
                  />
                </div>
                <div className='w-full mt-4'>
                  <label htmlFor='telefono'>Teléfono</label>
                  <Field
                    className='bg-stone-200 appearance-none border-2 border-stone-200 rounded w-full py-2 px-4 text-stone-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500'
                    id='telefono'
                    type='text'
                    name='telefono'
                  />
                  <ErrorMessage
                    className='text-red-500 text-sm'
                    component='span'
                    name='telefono'
                  />
                </div>
                <div className='w-full mt-4'>
                  <label htmlFor='fecha'>Fecha</label>
                  <Field
                    className='bg-stone-200 appearance-none border-2 border-stone-200 rounded w-full py-2 px-4 text-stone-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500'
                    id='fecha'
                    type='date'
                    name='fecha'
                  />
                  <ErrorMessage
                    className='text-red-500 text-sm'
                    component='span'
                    name='fecha'
                  />
                </div>
                <div className='w-full mt-4'>
                  <label htmlFor='hora'>Hora</label>
                  <Field
                    className='bg-stone-200 appearance-none border-2 border-stone-200 rounded w-full py-2 px-4 text-stone-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500'
                    id='hora'
                    type='time'
                    name='hora'
                  />
                  <ErrorMessage
                    className='text-red-500 text-sm'
                    component='span'
                    name='hora'
                  />
                </div>
                <div className='w-full mt-4'>
                  <label htmlFor='personas'>Personas</label>
                  <Field
                    className='bg-stone-200 appearance-none border-2 border-stone-200 rounded w-full py-2 px-4 text-stone-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500'
                    id='personas'
                    type='number'
                    name='personas'
                  />
                  <ErrorMessage
                    className='text-red-500 text-sm'
                    component='span'
                    name='personas'
                  />
                </div>
              </div>
              <div className='flex justify-center mt-4'>
                <button
                  className='bg-yellow-500 hover:bg-yellow-700 dark:bg-yellow-600  dark:hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Reservar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default ReservationPage;
