---
# Documentation: https://wowchemy.com/docs/managing-content/

title: "A Lightweight Domain Adaptive Absolute Pose Regressor Using Barlow Twins Objective"
authors: []
date: 2022-11-22T13:53:41+09:00
doi: ""

# Schedule page publish date (NOT publication's date).
publishDate: 2022-11-22T13:53:41+09:00

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["0"]

# Publication name and optional abbreviated publication name.
publication: "Arxiv Preprint"
publication_short: "Arxiv-v1"

abstract: "Identifying the camera pose for a given image is a challenging problem with applications in robotics, autonomous vehicles, and augmented/virtual reality. Lately, learning-based methods have shown to be effective for absolute camera pose estimation. However, these methods are not accurate when generalizing to different domains. In this paper, a domain adaptive training framework for absolute pose regression is introduced. In the proposed framework, the scene image is augmented for different domains by using generative methods to train parallel branches using Barlow Twins objective. The parallel branches leverage a lightweight CNN-based absolute pose regressor architecture. Further, the efficacy of incorporating spatial and channel-wise attention in the regression head for rotation prediction is investigated. Our method is evaluated with two datasets, Cambridge landmarks and 7Scenes. The results demonstrate that, even with using roughly 24 times fewer FLOPs, 12 times fewer activations, and 5 times fewer parameters than MS-Transformer, our approach outperforms all the CNN-based architectures and achieves performance comparable to transformer-based architectures. Our method ranks 2nd and 4th with the Cambridge Landmarks and 7Scenes datasets, respectively. In addition, for augmented domains not encountered during training, our approach significantly outperforms the MS-transformer. Furthermore, it is shown that our domain adaptive framework achieves better performance than the single branch model trained with the identical CNN backbone with all instances of the unseen distribution."

# Summary. An optional shortened abstract.
summary: "Identifying the camera pose for a given image is a challenging problem with applications in robotics, autonomous vehicles, and augmented/virtual reality. Lately, learning-based methods have shown to be effective for absolute camera pose estimation. However, these methods are not accurate when generalizing to different domains. In this paper, a domain adaptive training framework for absolute pose regression is introduced. In the proposed framework, the scene image is augmented for different domains by using generative methods to train parallel branches using Barlow Twins objective. The parallel branches leverage a lightweight CNN-based absolute pose regressor architecture. Further, the efficacy of incorporating spatial and channel-wise attention in the regression head for rotation prediction is investigated. Our method is evaluated with two datasets, Cambridge landmarks and 7Scenes. The results demonstrate that, even with using roughly 24 times fewer FLOPs, 12 times fewer activations, and 5 times fewer parameters than MS-Transformer, our approach outperforms all the CNN-based architectures and achieves performance comparable to transformer-based architectures. Our method ranks 2nd and 4th with the Cambridge Landmarks and 7Scenes datasets, respectively. In addition, for augmented domains not encountered during training, our approach significantly outperforms the MS-transformer. Furthermore, it is shown that our domain adaptive framework achieves better performance than the single branch model trained with the identical CNN backbone with all instances of the unseen distribution."

tags: []
categories: []
featured: false

# Custom links (optional).
#   Uncomment and edit lines below to show custom links.
# links:
# - name: Follow
#   url: https://twitter.com
#   icon_pack: fab
#   icon: twitter

url_pdf: 'https://arxiv.org/pdf/2211.10963'
url_code: 'https://arxiv.org/abs/2211.10963'
url_dataset:
url_poster:
url_project:
url_slides: 'https://arxiv.org/abs/2211.10963'
url_source: 
url_video:

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: ""
---
