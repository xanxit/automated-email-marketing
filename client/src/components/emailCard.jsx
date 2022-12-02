const EmailCard = ({item}) => {
    return (
        <div>

            <section class="text-gray-600 body-font overflow-hidden">
                <div class="container px-5 py-24 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="email" class="lg:w-1/2 w-full lg:h-auto h-56 object-cover object-center rounded" src="https://dummyimage.com/200x200" />
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 class="text-sm title-font text-gray-500 tracking-widest">SCHEDULED AT TIME</h2>
                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">TO:</h1>
                            <h2 class="text-sm title-font text-gray-500 tracking-widest mb-4">CC: </h2>
                            <p class="leading-relaxed">BODY: Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
                            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <span class="mr-3">Yours sincerely: Sakshi</span>
                                <span class="mr-3">Scheduling Type:</span>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EmailCard
