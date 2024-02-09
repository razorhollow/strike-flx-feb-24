import flushAssetUrl from 'app/assets/flush.jpg'
import pheasantAssetUrl from 'app/assets/pheasant.jpg'
import retrieveAssetUrl from 'app/assets/retrieve.jpg'

const posts = [
  {
    id: 1,
    title: 'Live Birds',
    description:
      "Experience realistic training with live birds. This session focuses on real-life scenarios, enhancing your retriever's hunting instincts and prey drive. Perfect for acclimating dogs to the excitement and unpredictability of live game.",
    imageUrl:
      `${pheasantAssetUrl}`,
  },
  {
    id: 2,
    title: 'Quartering and Flushing',
    description:
      "Introduce the art of quartering and flushing with your retriever. This training emphasizes precise teamwork and communication between you and your dog, ensuring effective coverage of the terrain and the perfect flush.",
    imageUrl:
      `${flushAssetUrl}`,
  },
  {
    id: 3,
    title: 'Steadiness to Flush/Gun/Fall',
    description:
      "Develop your dog's steadiness amidst the chaos of the hunt. This crucial training ensures your retriever remains composed and obedient in response to a bird's flush, gunshot sounds, and falling game, essential for a successful hunting experience.",
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
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Event Itinerary</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Our training plan for the day.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-between">
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
              <h3 className='mt-2 text-lg leading-8 text-gray-600 mx-auto font-extrabold'>{post.title}</h3>
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
