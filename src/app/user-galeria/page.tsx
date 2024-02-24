'use client'

import { Button, InputText, useNotification, MovieCard } from '@/components'
import { Template } from '@/components/TemplateUser'; 
import { AuthenticatedPage } from '@/components/AuthenticatedPageUser'; 
import { EasyMovie } from '@/resources/films/movies.resources';
import { useMovieService } from '@/resources'
import { useState } from 'react'

import Link from 'next/link';

export default function GaleriaPage(){

    const useService = useMovieService();
    const notification = useNotification();
    const [movies, setMovies] = useState<EasyMovie[]>([])
    const [query, setQuery] = useState<string>('')
    const [movieGenre, setGenre] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    



    async function searchMovies(){
        setLoading(true)
        const result = await useService.buscar(query, movieGenre);
        setMovies(result);
        setLoading(false);

        if(!result.length){
            notification.notify('No results found!', 'warning');
        }
    }

    
    

    function renderMovieCard(movie: EasyMovie) {
        return (
            <MovieCard key={movie.url} 
            movieTitle ={movie.movieTitle} 
            src={movie.url} 
            movieGenre={movie.movieGenre}
            duration={movie.duration}
            movieLink={movie.movieLink}
            country={movie.country}  />
        )
    }

    function renderMovieCards(){
        return movies.map(renderMovieCard)
    }


    
    return (
        <AuthenticatedPage>
            <Template loading={loading}>            
                <section className="flex flex-col items-center justify-center my-5">
                <h1 className='sizeTitle'>Procure o filme pelo nome</h1>
                    <div className="flex space-x-4 m-8">
                        <InputText placeholder='DIGITE O TÍTULO AQUI:' onChange={event => setQuery(event.target.value)}/>
                        <select onChange={event => setGenre(event.target.value)} 
                                className="border px-4 py-2 rounded-lg text-gray-900">
                            <option value="">CLIQUE AQUI E ESCOLHA O GÊNERO</option>
                            <option value="ACAO">Ação</option>
                            <option value="AVENTURA">Aventura</option>
                            <option value="COMEDIA">Comédia</option>
                            <option value="DRAMA">Drama</option>
                            <option value="FICCAO_CIENTIFICA">Ficção Científica</option>
                            <option value="ROMANCE">Romance</option>
                            <option value="TERROR">Terror</option>
                            <option value="ANIMACAO">Animação</option>
                            <option value="DOCUMENTARIO">Documentário</option>
                            
                        </select>
                        
                        <Button style='bg-blue-500 hover:bg-blue-300' label='Buscar' onClick={searchMovies}/>
                        
                        
                    </div>
                </section>

                <section className="grid grid-cols-4 gap-8">
                    {
                        renderMovieCards()
                    }                     
                </section>
            </Template>
        </AuthenticatedPage>
    )
}
