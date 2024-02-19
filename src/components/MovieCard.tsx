import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import Link from 'next/link';

interface MovieCardProps {
    movieTitle?: string;
    movieGenre?: string;
    duration?: string;
    movieLink?: string;
    country?: string;
    src?: string;
    id?: string;
}

// Dentro do componente MovieCard, adicione a exibição da imagem utilizando a propriedade src
export const MovieCard: React.FC<MovieCardProps> = ({ 
    movieTitle, movieGenre, src, duration, movieLink, country, id
}: MovieCardProps) => {

    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="card relative bg-white rounded-md shadow-md transition-tranform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
            <div onClick={toggleModal} className="h-85 w-full object-cover rounded-t-md cursor-pointer relative">
                {/* Exibindo a imagem utilizando a propriedade src */}
                <img src={src} className="h-full w-full object-cover rounded-t-md" alt="" />
                <div className="popup-content hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                    <button className="text-white text-lg">Fechar</button>
                </div>
            </div>
            <div className="card-body p-4">
                <h5 className="text-xl font-semibold mb-2 text-gray-600">{movieTitle}</h5>
                <p className="text-gray-600">{movieGenre}</p>
                <p className="text-gray-600">Duração: {duration}</p>
                <p className="text-gray-600">{country}</p>

            </div>
            <Modal 
                isOpen={isOpen} 
                onRequestClose={toggleModal} 
                contentLabel="YouTube Player Modal"
                style={{
                    content: {
                        width: '640px',
                        height: '360px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: 'none',
                        background: 'transparent',
                        overflow: 'hidden',
                        padding: '0',
                        outline: 'none'
                    },
                    overlay: {
                        background: 'rgba(0, 0, 0, 0.5)'
                    }
                }}
            >
                <ReactPlayer url={movieLink} controls />
                <button onClick={toggleModal}>Fechar</button>
            </Modal>
        </div>
    );
};

