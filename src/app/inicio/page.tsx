'use client'

import { Template, MovieCard } from '@/components'
import { EasyMovie } from '@/resources/films/movies.resources';
import { useMovieService } from '@/resources'
import { useEffect, useState } from 'react'
import Link from 'next/link';


export default function InicioPage() {
    const movieService = useMovieService();
    const [movies, setMovies] = useState<EasyMovie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const filmesPrincipais = ['O Auto da Compadecida', 'Lisbela e o Prisioneiro', 'Trinity Ainda é Meu Nome', 'Gatilhos da Vingança', 'Luzes da Cidade'];

    useEffect(() => {
        async function fetchMovies() {
            try {
                const promises = filmesPrincipais.map(title =>
                    movieService.buscar(title, '')
                );

                const moviePerTitle = await Promise.all(promises);
                const filteredMovies = moviePerTitle
                    .reduce((acc, curr) => acc.concat(curr), [])
                    .filter(movie => movie.movieTitle && filmesPrincipais.includes(movie.movieTitle));


                setMovies(filteredMovies);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar filmes:', error);
                setLoading(false);
            }
        }

        fetchMovies();
    }, []);

    function renderMovieCards() {
        return movies.map(movie => (
            <MovieCard
                key={movie.url}
                movieTitle={movie.movieTitle}
                src={movie.url}
                movieGenre={movie.movieGenre}
                duration={movie.duration}
                movieLink={movie.movieLink}
                country={movie.country}
            />
        ));
    }

    return (
        <Template loading={loading}>
            <section className="flex flex-col items-center justify-center my-5">
                <h1 className="sizeTitle">Principais filmes</h1>
            </section>

            <section className="grid grid-cols-4 gap-8">
                {renderMovieCards()}
            </section>
            <section className="flex flex-col items-center justify-center  mb-40">
                <h1 className="sizeTitle">Quer procurar por um filme em específico?</h1>
                <h2 className="sizeTitle2">Clique no Botão abaixo</h2>

                <Link href="/galeria">
                    <button className='bg-blue-500 hover:bg-blue-300 my-5 rounded-md px-4 py-3 text-white font-bold text-lg'>
                        CLIQUE AQUI
                    </button>
                </Link>
            </section>
        </Template>
    );
}