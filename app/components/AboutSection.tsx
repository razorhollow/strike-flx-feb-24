import groundsAssetUrl from 'app/assets/grounds.jpg'
import waterfowlAssetUrl from 'app/assets/waterfowl.jpg'
import flushAssetUrl from 'app/assets/flush.jpg'
import pheasantAssetUrl from 'app/assets/pheasant.jpg'
import retrieveAssetUrl from 'app/assets/retrieve.jpg'

const posts = [
  {
    id: 1,
    title: 'Exclusive Training Grounds',
    description:
      "Explore our 150-acre haven, a landscape boasting a variety of terrains including ponds, fields, and woods, tailored for every training stage",
    imageUrl:
      `${groundsAssetUrl}`,
  },
  {
    id: 2,
    title: 'Waterfowl Retriever Training',
    description:
      "Dive into our specialized waterfowl training with courses designed around our facility's ponds and water terrains for the ultimate retrieving experience",
    imageUrl:
      `${waterfowlAssetUrl}`,
  },
  {
    id: 3,
    title: 'Upland Bird Dog Training',
    description:
      "Practice upland hunting in our meticulously managed fields, offering the perfect mimicry of natural hunting scenarios to refine your dog's skills.",
    imageUrl:
      `${retrieveAssetUrl}`,
  },
  // More posts...
]

export default function AboutSection() {
  return (
    <div className="bg-white py-24 sm:py-32" id="about-section">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Train Smarter, Not Harder</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Get Started For Just $29/Month.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-start">
              <div className="relative">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="sm:aspect-square w-full rounded-2xl bg-gray-100 object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                <div className="group relative">
              <h3 className='mt-1 text-lg leading-8 text-gray-600 mx-auto font-extrabold'>{post.title}</h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
              </div>
            </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
