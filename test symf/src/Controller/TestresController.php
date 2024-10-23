<?php

namespace App\Controller;

use App\Repository\ScoreRepository;
use App\Repository\QuestionRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;

class TestresController extends AbstractController
{
    #[Route('/testres', name: 'app_testres')]
    public function index(QuestionRepository $questionRep, ScoreRepository $scoreRep): Response
    {
        $qna = $scoreRep->findAll();

        $encoder = new JsonEncoder();
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function (object $object, ?string $format, array $context): string {
                return $object->getId();
            },
        ];
        $normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);
        $serializer = new Serializer([$normalizer], [$encoder]);

        $jsonarr = $serializer->serialize($qna, 'json', [AbstractObjectNormalizer::ENABLE_MAX_DEPTH => true]);
        // var_dump($jsonarr);
        try{
            file_put_contents(
                "scores.json",
                $jsonarr,
            );
        }
        catch(IOException $e){

        }

        return $this->render('testres/index.html.twig', [
            // 'resp' => $qna,
        ]);
    }
}
