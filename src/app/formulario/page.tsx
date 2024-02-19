'use client'

import { InputText, Template, Button, RenderIf, useNotification, FieldError, AuthenticatedPage } from '@/components'
import { useMovieService } from '@/resources/films/movies.service'
import { useFormik } from 'formik'
import { useState } from 'react';
import { MovieRegistrationProps, formScheme, formValidationScheme } from './formScheme'
import Link from 'next/link'

export default function FormularioPage(){

    const [loading, setLoading] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<string>();
    const service = useMovieService();
    const notification = useNotification();

    const formik = useFormik<MovieRegistrationProps>({
        initialValues: formScheme,
        onSubmit: handleSubmit,
        validationSchema: formValidationScheme
    })
    
    async function handleSubmit(dados: MovieRegistrationProps) {
        setLoading(true);

        const formData = new FormData();
        formData.append("movieTitle", dados.movieTitle);
        formData.append("movieGenre", dados.movieGenre);
        formData.append("duration", dados.duration);
        formData.append("movieLink", dados.movieLink);
        formData.append("country", dados.country);
        formData.append("file", dados.file);



        await service.salvar(formData);

        formik.resetForm();
        setImagePreview('');

        setLoading(false);

        notification.notify('Filme cadastrado com sucesso!', 'success');
    }

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>){
        if(event.target.files){
            const file = event.target.files[0]
            formik.setFieldValue("file", file)
            const imageURL = URL.createObjectURL(file)
            setImagePreview(imageURL)
        }
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className='flex flex-col items-center justify-center my-5'>
                    <h5 className='mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900'>Novo Filme</h5>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='grid grid-cols-1'>
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Título: *</label>
                            <InputText id="movieTitle" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.movieTitle}
                                    placeholder="Insira o título do filme" />
                            <FieldError error={formik.errors.movieTitle} />
                        </div>

                        <div className='mt-5 grid grid-cols-1'>
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Gênero: *</label>
                            <InputText id="movieGenre" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.movieGenre}
                                    placeholder="Insira o gênero do filme" />
                            <FieldError error={formik.errors.movieGenre} />
                        </div>

                        <div className='mt-5 grid grid-cols-1'>
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Duração: *</label>
                            <InputText id="duration" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.duration}
                                    placeholder="Insira a duração no formato horas/minutos: 00:00" />
                            <FieldError error={formik.errors.duration} />
                        </div>

                        <div className='mt-5 grid grid-cols-1'>
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Link do filme: *</label>
                            <InputText id="movieLink" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.movieLink}
                                    placeholder="Insira o link do filme" />
                            <FieldError error={formik.errors.movieLink} />
                        </div>

                        <div className='mt-5 grid grid-cols-1'>
                            <label className='block text-sm font-medium leading-6 text-gray-700'>País: *</label>
                            <InputText id="country" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.country}
                                    placeholder="País do origem" />
                            <FieldError error={formik.errors.country} />
                        </div>

                        <div className='mt-5 grid grid-cols-1'>
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Poster: *</label>
                            <FieldError error={formik.errors.file} />
                            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                                <div className='text-center'>

                                    <RenderIf condition={!imagePreview}>
                                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" 
                                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" 
                                                clipRule="evenodd" />
                                        </svg>
                                    </RenderIf>

                                    <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                                        <label className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600'>
                                            
                                            <RenderIf condition={!imagePreview}>
                                                <span>Clique para o download</span>
                                            </RenderIf>

                                            <RenderIf condition={!!imagePreview}>
                                                <img src={imagePreview} width={250} className='rounded-md' />
                                            </RenderIf>

                                            <input onChange={onFileUpload} type='file' className='sr-only' />
                                        </label>
                                    </div>   
                                </div>
                            </div>
                        </div>

                        <div className='mt-5 flex items-center justify-end gap-x-4'>
                            <Button style='bg-blue-500 hover:bg-blue-300' type='submit' label='Save' />
                            <Link href="/galeria">
                                <Button style='bg-red-500 hover:bg-red-300' type='button' label='Cancel' />
                            </Link>
                        </div>
                    </form>
                </section>
            </Template>
        </AuthenticatedPage>
    )
}