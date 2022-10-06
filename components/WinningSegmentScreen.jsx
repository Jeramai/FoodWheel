import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function WinningSegmentScreen({ winningSegment, onHide }) {
  const [isLoading, setIsLoading] = useState(true);
  const [recipeData, setRecipeData] = useState([]);
  const [expectedNumberResults, setExpectedNumberResults] = useState(10);

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/search?query=${winningSegment}&number=${expectedNumberResults}&apiKey=61572441d63348e3a480c76458de5f75`
    )
      .then((response) => response.json())
      .then((results) => {
        setRecipeData(results);
        setIsLoading(false);
      });
  }, [expectedNumberResults, winningSegment]);

  return winningSegment && recipeData ? (
    <Modal show={true} onHide={onHide} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>Suggested recipes {`"${winningSegment}"`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RecipesWrapper recipeData={recipeData} />
        <hr />
        <OrderWrapper food={winningSegment} />
      </Modal.Body>
    </Modal>
  ) : null;
}

function RecipesWrapper({ recipeData }) {
  const recipeBlockStyle = {
    width: '300px',
    padding: '15px 8px 15px',
    margin: '0 0 15px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  };

  return (
    <>
      <div style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {recipeData.results?.map((recipe, i) => (
          <div
            key={recipe.id}
            style={
              i === recipeData.results.length - 1
                ? { ...recipeBlockStyle }
                : {
                    ...recipeBlockStyle,
                    borderRight: '1px solid #dee2e6'
                  }
            }
          >
            <Link href={recipe.sourceUrl} passHref>
              <a target='_blank' rel='noopener noreferrer'>
                <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                  <Image
                    src={`${recipeData.baseUri}${recipe.image}`}
                    layout='fill'
                    style={{ borderRadius: '8px' }}
                    alt={recipe.title}
                  />
                </div>
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '8px',
                    whiteSpace: 'pre-line',
                    fontWeight: '600'
                  }}
                >
                  {recipe.title}
                </span>
              </a>
            </Link>
            <small>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src='/cutlery.png' width={14} height={14} alt='Cutlery icon' />
                <span style={{ marginLeft: '5px' }}>{recipe.servings} servings</span>
              </div>
              <div style={{ width: '100%', textAlign: 'center' }}>(Ready in {recipe.readyInMinutes} minutes)</div>
            </small>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', paddingTop: '15px' }}>
        Showing {recipeData.results?.length} out of {recipeData.totalResults} results.
        {recipeData.results?.length !== recipeData.totalResults ? (
          <Button
            variant='outline-dark'
            size='sm'
            disabled={isLoading}
            style={{ position: 'absolute', right: '15px', bottom: '10px' }}
            onClick={() => {
              setIsLoading(true);
              setExpectedNumberResults((o) => o + 10);
            }}
          >
            {!isLoading ? 'More' : <i className='bi bi-arrow-clockwise'></i>}
          </Button>
        ) : null}
      </div>
    </>
  );
}

function OrderWrapper({ food }) {
  const postal = 'emmen-7823';
  const partners = [
    {
      name: 'thuisbezorgd',
      url: `https://www.thuisbezorgd.nl/bestellen/${food}/${postal}`,
      img: 'thuisbezorgd.png'
    },
    {
      name: 'eetnu',
      url: `https://eetnu.nl/zoek?query=${food}`,
      img: 'eetnu.png'
    },
    {
      name: 'ubereats',
      url: 'https://ubereats.com/search?kn=Pizza',
      img: 'ubereats.png'
    }
  ];

  return (
    <div className='d-flex justify-content-center flex-column align-items-center'>
      <strong>
        Or order <i>{food}</i> from:
      </strong>
      <div className='mt-3'>
        {partners.map((partner) => {
          return (
            <a href={partner.url} target='_blank' rel='noopener noreferrer' style={{ margin: '8px' }}>
              <Image src={`/partners/${partner.img}`} width={30} height={30} alt={partner.name} style={{ borderRadius: '8px' }} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
