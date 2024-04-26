<a-entity
        id="UI-Container"
        position="0 0 -100"
        visible="false"
>
    <a-entity id="Buttons-Container"
        position="0 1.2 0"
        scale=".5 .5 0"
    >
        <a-image
          load-template
          template-target="baseTemplate"
          src="/xr-portfolio/icons/arrow-left-button.png"
          position="-.32 0 0"
          scale="1 1 1"
          width=".3"
          height=".2"
        >
        </a-image>
        <a-image
          show-images
          src="/xr-portfolio/icons/image-button.png"
          position="0 0 0"
          scale="1 1 1"
          width=".3"
          height=".2"
        ></a-image>
        <a-image
          show-description
          src="/xr-portfolio/icons/file-text-button.png"
          position=".32 0 0"
          scale="1 1 1"
          width=".3"
          height=".2"
        ></a-image>

    </a-entity>

    <a-entity
            id="DescriptionContainer"
            scale=".8 .8 0"
            position="0 1.68 0"
            height="1"
            width="1"
            visible="false"
    >
        <a-image
            src="/xr-portfolio/img/panel-background.png"
            position="0 0 -1"
            scale="1 1 1"
            width="1"
            height="1"
        ></a-image>
        <a-text
            id="AppTitle"
            color="#555"
            position="-.47 .45 0"
            width=".9"
        ></a-text>
        <a-text
            id="AppSubtitle"
            color="#555"
            position="-.467 .41 0"
            width=".55"
        ></a-text>
        <a-text
            id="ChallengeLabel"
            color="#555"
            width=".7"
            position="-.47 .35 0"
            text="value: The Challenge;"
        ></a-text>
        <a-text
            id="ApproachLabel"
            color="#555"
            width=".7"
            position="-.47 .05 0"
            text="value: The Approach"
        ></a-text>
        <a-text
            id="ResultsLabel"
            color="#555"
            width=".7"
            position="-.47 -.25 0"
            text="value: The Results"
        ></a-text>

        <a-text
            id="TheChallenge"
            color="#555"
            position="-.24 .355 0"
            width=".7"
            wrap-count="55"
            text="align: left; anchor: left; baseline: top"
        ></a-text>
        <a-text
            id="TheApproach"
            color="#555"
            position="-.24 .055 0"
            width=".7"
            wrap-count="55"
            text="align: left; anchor: left; baseline: top"
        ></a-text>
        <a-text
            id="TheResults"
            color="#555"
            position="-.24 -.245 0"
            width=".7"
            wrap-count="55"
            text="align: left; anchor: left; baseline: top"
        ></a-text>
    </a-entity>
    <a-entity visible="false" scale="1 1 0" position="-0.016 2.255 -1.500" geometry="height: 1.610; width:2.5">
        <a-entity layout="align: center; type:box; columns: 3; margin: .8" position="0 0 50" id="ImageContainer"></a-entity>
    </a-entity>
</a-entity>